/** *********
 *
 * FAQPage
 *
 *********** */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectFAQ, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../components/Loading';
import bg from './bg.png';
// import Loading from '../../components/Loading';
import FaqSkeleton from './FaqSkeleton';

const styles = {
  // FAQParent: {
  //   marginBottom: '15px',
  //   boxShadow: 'none',
  //   background: '#f7f8f9',
  //   borderRadius: '4px',
  //   border: 'none',
  //   '&:before': {
  //     background: 'none',
  //   },
  // },
  // FAQchild: {
  //   fontSize: '1.5em',
  //   textTransform: 'uppercase',
  //   fontWeight: '700',
  //   color: '#444444',
  // },
  // FAQPanel: {
  //   marginBottom: '15px',
  //   boxShadow: 'none',
  //   borderRadius: '4px',
  //   border: 'none',
  // },
};

class FAQPage extends React.Component {
  static propTypes = {
    loadFAQRequest: PropTypes.func.isRequired,
    faq: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: 'panel1',
      qExpanded: '',
    };
  }

  componentDidMount() {
    this.props.loadFAQRequest();
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleQChange = panel => (event, expanded) => {
    this.setState({
      qExpanded: expanded ? panel : false,
    });
  };

  render() {
    const { faq, classes, loading } = this.props;

    const { expanded, qExpanded } = this.state;

    return loading ? (
      null
    ) : (
        <div>
          {faq.cat &&
            faq.cat.map(
              x =>
                faq.faq &&
                faq.faq.filter(z => z.category == x._id).length !== 0 && (
                  <div key={`cat-${x._id}`} className="mb-6">
                    <h2 className="text-3xl text-center tracking-tight text-black mb-4">{x.title}</h2>
                    {/* <ExpansionPanelSummary /> */}
                    <ExpansionPanelDetails
                      style={{ display: 'block', paddingLeft: 0 }}
                    >
                      {faq.faq &&
                        faq.faq
                          .filter(z => z.category == x._id)
                          .map(y => (
                            <ExpansionPanel
                              className={classes.FAQPanel}
                              key={`faq-${y._id}`}
                              expanded={qExpanded === y._id}
                              onChange={this.handleQChange(y._id)}
                            >
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <p className="text-base">{y.question}</p>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                <p className="text-base">{y.title}</p>
                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                          ))}
                    </ExpansionPanelDetails>
                  </div>
                ),
            )}
        </div>
      );
  }
}

const withReducer = injectReducer({ key: 'faq', reducer });

const withSaga = injectSaga({ key: 'faq', saga });

const mapStateToProps = createStructuredSelector({
  faq: makeSelectFAQ(),
  loading: makeSelectLoading(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withStyle = withStyles(styles);
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(FAQPage);
