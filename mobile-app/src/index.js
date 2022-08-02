/* all routing setup go here */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Feather from 'react-native-vector-icons/Feather';
import WalkThrough from './screens/walkthrough';
import NewsScreen from './screens/news';
import NewsDetail from './screens/newsdetail';
import MenuScreen from './screens/menu';
import SearchScreen from '../src/screens/searches';
import DetailScreen from '../src/screens/detail';
import ProfileInformation from '../src/screens/profileinfo';
import ForgotPassword from '../src/screens/forgotpassword';
import Terms from '../src/screens/termsandconditions';
import Privacy from '../src/screens/privacy';
import ChangePassword from '../src/screens/changepassword';
import TypeDetails from '../src/screens/typedetail';
import ProjectDetails from '../src/screens/projectdetail';
import Login from '../src/screens/login';
import Signup from '../src/screens/signup';
import Userprofile from './screens/LoggedinProfile';
import AddProperty from '../src/screens/addproperty';
import AddProperty2 from '../src/screens/addproperty2';
import AddProperty3 from '../src/screens/addproperty3';
import EMICalculator from '../src/screens/emicalculator';
import UnitConverter from '../src/screens/unitconverter/index';
import HomeScreen from '../src/screens/home/index';
import AllProperties from '../src/screens/recentallproperties/index';
import WantedAllProperties from '../src/screens/wantedallproperties/index';
import ProjectAllProperties from '../src/screens/projectallproperties/index';
import RequestProperty from '../src/screens/requestproperty/index';
import NewsComment from '../src/screens/newscommentdetail/index';
import PremiumPropertyAll from '../src/screens/premiumallproperty/index';
import TrendingPropertyAll from '../src/screens/trendingpropertyall/index';
import VerifyEmail from '../src/screens/emailverify/index';
import ForgotPasswordChange from '../src/screens/forgotpasswordchange';
import BankLoan from '../src/screens/bankloan';
import ApplyLoan from '../src/screens/applyloan';
import AddButton from './screens/component/add';
import About from '../src/screens/about';
import Success from '../src/screens/success';
import PostRequirement from '../src/screens/postrequirement';
import Agency from '../src/screens/agency';
import AgencyAllProperty from '../src/screens/agencypropertyall';
import PropertyComments from '../src/screens/propertycomments';

const WelcomeNavigator = createStackNavigator(
  {
    WalkThrough,
    // Login,
    // Signup,
  },
  {
    defaultNavigationOptions: () => ({
      header: null,
    }),
  },
);

const Explore = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => {
        return {
          header: null,

          // tabBarIcon: ({ tintColor }) => (
          //   <Icon name="home" size={30} color="#900" />
          // ),
          // headerLeft: (
          //   <Icon
          //     style={{ paddingLeft: 10 }}
          //     onPress={() => navigation.openDrawer()}
          //     name="md-menu"
          //     size={30}
          //   />
          // )
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const News = createStackNavigator({
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  },
});

const Menu = createStackNavigator({
  MenuScreen: {
    screen: MenuScreen,
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  },
});
const Profile = createSwitchNavigator({
  // ProfileScreen: {
  //   screen: ProfileScreen,
  //   navigationOptions: () => {
  //     return {
  //       header: null,
  //     };
  //   },
  // },
  Login: {
    screen: Login,
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  },
  Userprofile: {
    screen: Userprofile,
    navigationOptions: () => {
      return {
        headerTitle: 'Profile',
        headerTitleStyle: {
          fontSize: 18,
          marginLeft: 0,
        },
      };
    },
  },
});

// const AddTabNavigator = createBottomTabNavigator(
//   {
//     Adding: {
//       screen: () => null, // Empty screen
//       navigationOptions: () => ({
//         tabBarIcon: <AddButton />, // Plus button component
//       }),
//     },
//   },
//   {
//     tabBarOptions: {
//       showLabel: false,
//       activeTintColor: '#F8F8F8',
//       inactiveTintColor: '#586589',
//       style: {
//         backgroundColor: '#171F33',
//       },
//       tabStyle: {},
//     },
//   },
// );
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Explore,
    News,
    Adding: {
      screen: () => null, // Empty screen
      navigationOptions: (props) => ({
        tabBarIcon: (
          <AddButton navigate={props.navigation.navigate} goback={'goback'} />
        ), // Plus button component
        tabBarLabel: () => null,
      }),
    },
    Profile,
    Menu,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Feather;
        let iconName;
        if (routeName === 'Explore') {
          iconName = 'search';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'News') {
          iconName = 'file-text';
        } else if (routeName === 'Profile') {
          iconName = 'user';
        } else if (routeName === 'Menu') {
          iconName = 'menu';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
      // statusBarOptions: { hidden: false, backgroundColor: 'red' },
    }),
    tabBarOptions: {
      labelStyle: {
        fontSize: 11,
        paddingBottom: 4,
        textTransform: 'uppercase',
        fontFamily: 'sfprotextSemibold',
      },
      activeTintColor: 'white',
      inactiveTintColor: '#8D95DC',
      style: {
        backgroundColor: '#202B8B',
        height: 56,
        borderTopWidth: 0,
      },
    },
  },
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: {
      screen: DashboardTabNavigator,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: () => {
        return {
          headerTitle: 'Search Results',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    NewsDetail: {
      screen: NewsDetail,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    AddProperty: {
      screen: AddProperty,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    AddProperty2: {
      screen: AddProperty2,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    AddProperty3: {
      screen: AddProperty3,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    ProfileInformation: {
      screen: ProfileInformation,
      navigationOptions: () => {
        return {
          headerTitle: 'Profile',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    Terms: {
      screen: Terms,
      navigationOptions: () => {
        return {
          headerTitle: 'Terms & Conditions',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    Privacy: {
      screen: Privacy,
      navigationOptions: () => {
        return {
          headerTitle: 'Privacy Policy',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    EMICalculator: {
      screen: EMICalculator,
      navigationOptions: () => {
        return {
          headerTitle: 'EMI Calculator',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    UnitConverter: {
      screen: UnitConverter,
      navigationOptions: () => {
        return {
          headerTitle: 'Unit Converter',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    TypeDetails: {
      screen: TypeDetails,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    ProjectDetails: {
      screen: ProjectDetails,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    AllProperties: {
      screen: AllProperties,
      navigationOptions: () => {
        return {
          headerTitle: 'Recent Properties',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    WantedAllProperties: {
      screen: WantedAllProperties,
      navigationOptions: () => {
        return {
          headerTitle: 'Wanted Properties',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    ProjectAllProperties: {
      screen: ProjectAllProperties,
      navigationOptions: () => {
        return {
          headerTitle: 'Recent Projects',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    RequestProperty: {
      screen: RequestProperty,
      navigationOptions: () => {
        return {
          headerTitle: ' Make Request',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: () => {
        return {
          headerTitle: 'Forgot Password',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: () => {
        return {
          headerTitle: 'Change Password',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    NewsComment: {
      screen: NewsComment,
      navigationOptions: () => {
        return {
          headerTitle: 'Comment',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    TrendingPropertyAll: {
      screen: TrendingPropertyAll,
      navigationOptions: () => {
        return {
          headerTitle: 'Featured Properties',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    PremiumPropertyAll: {
      screen: PremiumPropertyAll,
      navigationOptions: () => {
        return {
          headerTitle: 'Premium Properties',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
            fontWeight: 'bold',
          },
        };
      },
    },
    VerifyEmail: {
      screen: VerifyEmail,
      navigationOptions: () => {
        return {
          headerTitle: 'Verify Email',
        };
      },
    },
    ForgotPasswordChange: {
      screen: ForgotPasswordChange,
      navigationOptions: () => {
        return {
          headerTitle: 'Reset Password',
        };
      },
    },
    BankLoan: {
      screen: BankLoan,
      navigationOptions: () => {
        return {
          headerTitle: '',
        };
      },
    },
    ApplyLoan: {
      screen: ApplyLoan,
      navigationOptions: () => {
        return {
          headerTitle: 'Apply For Loan',
        };
      },
    },
    About: {
      screen: About,
      navigationOptions: () => {
        return {
          headerTitle: 'About Us',
        };
      },
    },
    Success: {
      screen: Success,
      navigationOptions: () => {
        return {
          header: null,
        };
      },
    },
    PostRequirement: {
      screen: PostRequirement,
      navigationOptions: () => {
        return {
          headerTitle: 'Post Requirements',
        };
      },
    },
    Agency: {
      screen: Agency,
      navigationOptions: () => {
        return {
          headerTitle: 'Agency',
        };
      },
    },
    AgencyAllProperty: {
      screen: AgencyAllProperty,
      navigationOptions: () => {
        return {
          headerTitle: 'All Properties',
        };
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: () => {
        return {
          headerTitle: 'Sign Up',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
          },
        };
      },
    },
    PropertyComments: {
      screen: PropertyComments,
      navigationOptions: () => {
        return {
          headerTitle: 'Comments',
          headerTitleStyle: {
            fontSize: 18,
            marginLeft: 0,
          },
        };
      },
    },
  },

  // {
  //   defaultNavigationOptions: () => {
  //     return {
  //       header: null,
  //     };
  //   },
  // },
);

export const AppWelcomeContainer = createAppContainer(WelcomeNavigator);
export const AppContainer = createAppContainer(DashboardStackNavigator);
