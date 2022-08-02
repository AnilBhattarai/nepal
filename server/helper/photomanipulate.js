const Jimp = require('jimp');
const fs = require('fs');
const internal = {};
const path = require('path');
const LOGO = './public/default/watermark.png';

const photomanipulate = {};

photomanipulate.changephoto = async (req, res, next) => {
  try {
    let w = req.params.w - 0;
    let h = req.params.h - 0;
    let picpath = req.params[0];

    if (fs.existsSync(`./public/${w}-${h}/${picpath}`)) {
      return next();
    }
    if (!fs.existsSync(`./public/${picpath}`)) {
      return next();
    }
    if (!h) {
      h = Jimp.AUTO;
    }
    Jimp.read(`./public/${picpath}`, async (err, image) => {
      if (err) {
        return next();
      }
      if (image) {
        var o_w = image.bitmap.width;
        var o_h = image.bitmap.height;
        if (o_w > w || o_h > h) {
          const i = await image.scaleToFit(w, h).write(`./public/${w}-${h}/${picpath}`);
        } else {
          const i = await image.write(`./public/${w}-${h}/${picpath}`);
        }
        fs.readFile(`./public/${w}-${h}/${picpath}`, async function (err, data) {
          if (err) {
            return res.sendFile(path.join(__dirname, `../public/${picpath}`));
          } else {
            return res.send(data);
          }
        });
      }
    }).catch((err) => {
      return next();
    });
  } catch (err) {
    return next(err);
  }
};
internal.setLogoWatermark = async (original_file) => {
  const [image, logo] = await Promise.all([Jimp.read(original_file), Jimp.read(LOGO)]);
  const LOGO_MARGIN_PERCENTAGE = 5;

  const xMargin = image.bitmap.width / 100;
  const yMargin = image.bitmap.width / 100;
  console.log(logo.bitmap.width);
  console.log(logo.bitmap.height);
  const X = image.bitmap.width / 2 - 120;
  const Y = image.bitmap.height / 2 - 110;
  console.log('Logo', logo, 'X', X, 'Y', Y);
  return image.composite(logo, X, Y, [
    {
      mode: Jimp.BLEND_SCREEN,
      opacitySource: 1,
      opacityDest: 0.51,
    },
  ]);
};
photomanipulate.setWatermark = async (req, res, next) => {
  try {
    console.log(`------------------------------------------------------------------------`);
    let FILENAME = req.params[0];
    if (fs.existsSync(`./public/wimg/${FILENAME}`)) {
      return next();
    }
    if (!fs.existsSync(`./public/${FILENAME}`)) {
      return next();
    }
    const originalFileName = `./public/${FILENAME}`;
    const d = await internal.setLogoWatermark(originalFileName).then((image) => image.write(`./public/wimg/${FILENAME}`));
    fs.readFile(`./public/wimg/${FILENAME}`, function (err, data) {
      if (err) {
        return next(err);
      } else {
        // modify the data here, then send it
        res.send(data);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = photomanipulate;
