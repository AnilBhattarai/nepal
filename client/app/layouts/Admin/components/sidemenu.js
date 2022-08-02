// https://material.io/tools/icons
const menu = [
  { key: '1', name: 'Dashboard', icon: 'dashboard', link: '/admin/dashboard' },
  {
    key: '8',
    name: 'Properties',
    icon: 'location_city',
    link: '/admin/property',
  },
  {
    key: '10',
    name: 'Projects',
    icon: 'location_city',
    link: '/admin/project-manage',
  },

  // {
  //   key: '2.3',
  //   name: 'Leads Management',
  //   icon: 'timeline',
  //   link: '/admin/lead-manage',
  // },
  // {
  //   key: '2.5',
  //   name: 'Manage Leads',
  //   icon: 'trending_up',
  //   link: '/admin/manage-lead',
  // },
  {
    key: '11',
    name: 'Agencies',
    icon: 'work',
    link: '/admin/agency-manage',
  },
  {
    key: '12',
    name: 'Developers',
    icon: 'work',
    link: '/admin/developers',
  },
  // {
  //   key: '2.9',
  //   name: 'Expert Management',
  //   icon: 'portrait',
  //   link: '/admin/expert-manage',
  // },
  {
    key: '13',
    name: 'Premium/Featured',
    icon: 'location_city',
    link: '/admin/property-section',
  },
  {
    key: '14',
    name: 'Banks',
    icon: 'location_city',
    link: '/admin/banks',
  },
  {
    key: '15',
    name: 'Agents',
    icon: 'people',
    link: '/admin/agents-manage',
  },
  {
    key: '16',
    name: 'Builders',
    icon: 'people',
    link: '/admin/builders-manage',
  },
  {
    key: '17',
    name: 'Authors',
    icon: 'people',
    link: '/admin/authors-manage',
  },
  // {
  //   key: '18',
  //   name: 'FAQ',
  //   icon: 'question_answer',
  //   menu: [
  //     {
  //       key: '18.1',
  //       name: 'Faq',
  //       icon: 'remove',
  //       link: '/admin/faq-manage',
  //     },
  //     {
  //       key: '3.6.2',
  //       name: 'Category',
  //       icon: 'remove',
  //       link: '/admin/faq-cat-manage',
  //     },
  //   ],
  // },
  {
    key: '19',
    name: 'News',
    icon: 'library_books',
    menu: [
      {
        key: '19.1',
        name: 'News',
        link: '/admin/blog-manage',
        icon: 'remove',
      },
      {
        key: '19.2',
        name: 'Category',
        icon: 'remove',
        link: '/admin/blog-cat-manage',
      },
    ],
  },
  {
    key: '3',
    name: 'Content Manage',
    icon: 'text_fields',
    menu: [
      {
        key: '3.1',
        name: 'Menu Management',
        icon: 'menu',
        link: '/admin/menu-manage',
      },
      {
        key: '3.2',
        name: 'Page Management',
        icon: 'insert_drive_file',
        link: '/admin/page-manage',
      },
      {
        key: '3.10',
        name: 'Ad Management',
        icon: 'insert_drive_file',
        link: '/admin/ad-manage',
      },
      {
        key: '3.5',
        name: 'Static Content',
        icon: 'format_shapes',
        link: '/admin/content-manage',
      },
      {
        key: '3.7',
        name: 'Media',
        icon: 'perm_media',
        link: '/admin/media-manage',
      },
      {
        key: '3.8',
        name: 'Slider',
        icon: 'slideshow',
        link: '/admin/slider-manage',
      },
      {
        key: '3.9',
        name: 'Popup Setting',
        icon: 'slideshow',
        link: '/admin/popup-setting',
      },
      // {
      //   key: '3.3',
      //   name: 'News Management',
      //   icon: 'dashboard',
      //   link: '/admin/news-manage',
      // },
      // {
      //   key: '3.4',
      //   name: 'Testimonial Management',
      //   icon: 'message',
      //   link: '/admin/testimonial-manage',
      // },

      {
        key: '2.6',
        name: 'Careers',
        icon: 'library_books',
        menu: [
          {
            key: '2.6.1',
            name: 'Careers',
            link: '/admin/career',
            icon: 'remove',
          },
          {
            key: '2.6.2',
            name: 'Applied Users',
            link: '/admin/appliedusers',
            icon: 'remove',
          },
        ],
      },
      {
        key: '2.2',
        name: 'FAQ',
        icon: 'question_answer',
        menu: [
          {
            key: '2.2.1',
            name: 'Faq',
            icon: 'remove',
            link: '/admin/faq-manage',
          },
          {
            key: '2.2.2',
            name: 'Category',
            icon: 'remove',
            link: '/admin/faq-cat-manage',
          },
        ],
      },
    ],
  },
  {
    key: '4',
    name: 'Access Manage',
    icon: 'security',
    menu: [
      {
        key: '4.1',
        name: 'Users',
        icon: 'account_circle',
        link: '/admin/user-manage',
      },
      {
        key: '4.2',
        name: 'Roles',
        icon: 'people',
        link: '/admin/role-manage',
      },
      {
        key: '4.3',
        name: 'Modules',
        icon: 'extension',
        link: '/admin/module-manage',
      },
    ],
  },
  {
    key: '150',
    name: 'Lead Manage',
    icon: 'settings',
    link: '/admin/lead-manage',
  },
  {
    key: '160',
    name: 'Resource Manage',
    icon: 'settings',
    link: '/admin/resource-manage',
  },
  {
    key: '5',
    name: 'Settings',
    icon: 'settings',
    menu: [
      {
        key: '5.01',
        name: 'Location Tree View',
        icon: 'remove',
        link: '/admin/location-tree-view',
      },
      {
        key: '5.1',
        name: 'Locations',
        icon: 'settings',
        menu: [
          {
            key: '5.1.1',
            name: 'Country',
            icon: 'remove',
            link: '/admin/country-manage',
          },
          {
            key: '5.1.2',
            name: 'Zone',
            icon: 'remove',
            link: '/admin/zone-manage',
          },
          {
            key: '5.1.3',
            name: 'Shipping Zone',
            icon: 'remove',
            link: '/admin/shipping-zone-manage',
          },
          {
            key: '5.1.4',
            name: 'State',
            icon: 'remove',
            link: '/admin/state-manage',
          },
          {
            key: '5.1.5',
            name: 'District',
            icon: 'remove',
            link: '/admin/district-manage',
          },
          {
            key: '5.1.6',
            name: 'Muncipalities',
            icon: 'remove',
            link: '/admin/vdc-manage',
          },
          {
            key: '5.1.7',
            name: 'Area',
            icon: 'remove',
            link: '/admin/area-manage',
          },
        ],
      },
      {
        key: '5.2',
        name: 'Property Purpose',
        icon: 'settings',
        link: '/admin/property-purpose',
      },
      {
        key: '5.3',
        name: 'Property Type ',
        icon: 'settings',
        link: '/admin/property_type_manage',
      },
      {
        key: '5.4',
        name: 'Property Category',
        icon: 'settings',
        link: '/admin/property-category',
      },
      {
        key: '5.5',
        name: 'Area Unit',
        icon: 'settings',
        link: '/admin/area-unit',
      },
      {
        key: '5.6',
        name: 'Length Unit',
        icon: 'settings',
        link: '/admin/LengthUnit',
      },
      {
        key: '5.7',
        name: 'Property Face',
        icon: 'settings',
        link: '/admin/property-face',
      },
      {
        key: '5.8',
        name: 'Road Type',
        icon: 'settings',
        link: '/admin/road-type',
      },
      {
        key: '5.9',
        name: 'Calender Type',
        icon: 'settings',
        link: '/admin/calender-type',
      },
      {
        key: '5.10',
        name: 'Furnishing',
        icon: 'settings',
        link: '/admin/furnishing',
      },
      {
        key: '5.11',
        name: 'Amenities',
        icon: 'settings',
        link: '/admin/amenities',
      },
      {
        key: '5.12',
        name: 'Image Caption',
        icon: 'settings',
        link: '/admin/image-caption',
      },
      {
        key: '5.13',
        name: 'Project Features',
        icon: 'settings',
        link: '/admin/project-features',
      },
      {
        key: '5.14',
        name: 'Project Status',
        icon: 'settings',
        link: '/admin/project-status',
      },
      // {
      //   key: '5.15',
      //   name: 'Currency',
      //   icon: 'euro_symbol',
      //   link: '/admin/currency',
      // },
      {
        key: '5.16',
        name: 'Price Label',
        icon: 'euro_symbol',
        link: '/admin/price-label',
      },
      {
        key: '5.17',
        name: 'Complain Types',
        icon: 'settings',
        link: '/admin/complain_type_manage',
      },
      {
        key: '5.18',
        name: 'Ownership Types',
        icon: 'settings',
        link: '/admin/ownership-type-manage',
      },
      {
        key: '5.19',
        name: 'Directory Category',
        icon: 'settings',
        link: '/admin/service-category-manage',
      },
      {
        key: '5.20',
        name: 'Directory',
        icon: 'settings',
        link: '/admin/directory-manage',
      },
      {
        key: '5.21',
        name: 'Listing Package',
        icon: 'settings',
        link: '/admin/listing-package-manage',
      },
      {
        key: '5.22',
        name: 'Useful Collection',
        icon: 'settings',
        link: '/admin/useful-collection',
      },
      {
        key: '5.23',
        name: 'Property Status',
        icon: 'settings',
        link: '/admin/property-status',
      },
      {
        key: '4.2',
        name: 'General Settings',
        icon: 'email',
        link: '/admin/settings',
      },
    ],
  },
  {
    key: '6',
    name: 'Support',
    icon: 'help',
    menu: [
      {
        key: '6.10',
        name: 'Push Notifications',
        icon: 'library_books',
        link: '/admin/push-notification',
      },
      {
        key: '5.1',
        name: 'Email Template',
        icon: 'email',
        link: '/admin/template-manage',
      },
      {
        key: '6.6',
        name: 'Requests Management',
        icon: 'person_add',
        link: '/admin/request-manage',
      },
      {
        key: '6.1',
        name: 'Contacts',
        icon: 'contact_phone',
        link: '/admin/contact-manage',
      },
      {
        key: '6.2',
        name: 'Newsletter Management',
        icon: 'send',
        link: '/admin/newsletter-manage',
      },
      {
        key: '6.3',
        name: 'Subscribes',
        icon: 'subscriptions',
        link: '/admin/subscribe-manage',
      },
      {
        key: '6.4',
        name: 'Comment',
        icon: 'comment',
        link: '/admin/blog-comment-manage',
      },
      {
        key: '6.5',
        name: 'Feedback',
        icon: 'comment',
        link: '/admin/feedback',
      },
      // {
      //   key: '5.3',
      //   name: 'Reports',
      //   icon: 'insert_chart',
      //   link: '/admin/reports',
      // },
      // {
      //   key: '6.7',
      //   name: 'Forum',
      //   icon: 'library_books',
      //   link: '/admin/forum',
      // },
      {
        key: '6.8',
        name: 'Home loan',
        icon: 'library_books',
        link: '/admin/home-loan',
      },
      {
        key: '6.9',
        name: 'Property Messages',
        icon: 'library_books',
        link: '/admin/offer-messages',
      },
      {
        key: '6.9',
        name: 'Agency Messages',
        icon: 'library_books',
        link: '/admin/agency-messages',
      },
      {
        key: '6.9',
        name: 'Developer Messages',
        icon: 'library_books',
        link: '/admin/developer-messages',
      },
    ],
  },
  {
    key: '7',
    name: 'Reports',
    icon: 'insert_chart',
    menu: [
      // {
      //   key: '7.3',
      //   name: 'Reports',
      //   icon: 'insert_chart',
      //   link: '/admin/reports',
      // },
      {
        key: '7.4',
        name: 'Errors',
        icon: 'error_outline',
        link: '/admin/errors',
      },
    ],
  },
  // {
  //   key: '8',
  //   name: 'Ads Management',
  //   icon: 'monetization_on',
  //   link: '/admin/ads-manage',
  // },
];
export default menu;