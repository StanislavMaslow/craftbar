import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Content, View, Text } from 'native-base';
import { getPrivacyPolicyReq } from '../../redux-controller/user';
import styles from './styles';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';
import Loader from '../../commons/Loader';

class PrivacyPolicyScreen extends Component {
  static propTypes = {
    getPrivacyPolicyRequest: PropTypes.func,
    loading: PropTypes.bool,
    navigation: PropTypes.objectOf(PropTypes.any),
    privacyPolicy: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    getPrivacyPolicyRequest: () => {},
    loading: false,
    navigation: {},
    privacyPolicy: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // message: '',
    };
  }

  componentDidMount() {
    const { getPrivacyPolicyRequest } = this.props;

    getPrivacyPolicyRequest();
  }

  render() {
    const { navigation, loading, privacyPolicy } = this.props;

    if (loading) {
      return <Loader />;
    }
    return (
      <Container>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Privacy Policy" navigation={navigation} />
        <Content style={styles.content}>
          {false ? (
            <Text>{privacyPolicy.message}</Text>
          ) : (
            <View>
              <Text style={[styles.bold, styles.centered]}> I. Scope of this Privacy Policy </Text>
              <Text style={styles.justified}>
                This Privacy Policy describes the types of personal information The Crafty Barkeep
                (“TCBK,” ”Company,” “us,” “we” or “our”) collects through
                https://www.thecraftybarkeep.com, the TCBK mobile applications and various related
                services (the “Site”), and how we collect, use, and share that information. This
                Privacy Policy does not govern our collection of personal information through any
                other website or other means, other than through the Site.{'\n'}
                Our processing of personal data, such as your name, address, e-mail address, or
                telephone number, shall be undertaken consistent with the requirements of applicable
                privacy laws, including, but not limited to, the General Data Protection Regulation
                (“GDPR”). The purpose of this Privacy Policy is to provide to users and potential
                users of our website information about the nature, scope, and purpose of the
                personal data we collect, use and process and to advise data subjects of their
                rights. Whether we serve as the data controller or processor, TCBK has implemented
                numerous technical and organizational measures to ensure the protection of personal
                data processed through the Site. However, Internet-based data transmissions may in
                principle have security gaps, so please understand that absolute protection is not
                assured.{'\n'}
                By using the Site, you accept and expressly agree to our practices surrounding the
                collection, use, and sharing of personal information provided by you in the manner
                described in this Privacy Policy. If you do not agree with the terms of this Privacy
                Policy, you cannot, and we do not authorize you to, access, browse, or use the Site.
                {'\n'}
              </Text>
              <Text style={[styles.bold, styles.centered]}>
                II. Personal Information We Collect
              </Text>
              <Text style={[styles.bold]}>A. Information You Give Us</Text>
              <Text style={[styles.justify]}>
                Except for physical location information and tracking technologies (as described
                below), you do not have to give us any personal information to browse this Site.
                However, you may be asked to provide personal information to submit or request
                information from us, or to use the services offered through this Site. Once you
                provide us with your personal information, you are no longer anonymous to us. This
                information may include:{'\n'}
              </Text>
              <Text style={[styles.bold]}>Registration Information:</Text>
              <Text style={[styles.justify]}>
                When you sign up for the Site, you are required to provide information such as your
                name, username, password, email address, and date of birth. In addition, you may be
                asked to provide optional information, including gender and location to enhance the
                Site experience.{'\n'}
              </Text>
              <Text style={[styles.bold]}>Additional Information:</Text>
              <Text style={[styles.justify]}>
                Additional information that you provide to us, including through feedback, pictures
                you upload, comments, ratings, reviews, messages, emails, posts to public discussion
                boards, event registrations, answers to surveys or questionnaires that you may
                submit. B. Location Information. In order to access and use certain areas or
                features of the Site, you consent to our collection and use of your physical
                location information if you use the Site on a location-enabled device (including
                GPS, cellular, and Wi-Fi networks) or from your browser.{'\n'}{' '}
              </Text>
              <Text style={[styles.bold]}>C. Automated</Text>
              <Text>
                Information Collection In order to access and use certain areas or features of the
                Site, you consent to our collection and use of certain information about your use of
                the Site through the use of tracking technologies or by other passive means. Your
                consent to our access and use of this “passively collected” information includes,
                but is not limited to, the domain name of the website that allowed you to navigate
                to the Site, search engines used, the internet protocol (IP) address used, the
                length of time spent on the Site, the pages you looked at on the Site, other web
                pages you visited before and after visiting the Site, the type of internet browser
                you have, the frequency of your visits to the Site, and other relevant statistics,
                including the following: Log Information: When you access the Site, you also consent
                to our servers automatically recording information that your browser sends whenever
                you visit a website. These server logs may include information such as your web
                request, IP address, browser type, browser language, the date and time of your
                request, your computer operating system, mobile device and mobile operating system,
                name of your internet service provider or your mobile carrier, and one or more
                cookies (small text files containing a string of characters) that may uniquely
                identify your browser. Our servers also automatically record what you click on while
                visiting the Site. Location Information: You consent to our receipt of location data
                passed to us from location-enabled devices or that you have enabled, from your
                browser, or from third-party services. Links: The Site may include links in a format
                that enables us to keep track of the IP addresses from which these links have been
                followed. You further consent to our collection and use this information to improve
                the quality of our Site, product(s) and TCBK business operations. URLs: When you
                visit or access the Site, you consent to our receipt of the URL of the site from
                which you came and links you click on to leave the site. Additionally, advertisers
                receive the URL of the page you were on when you click on an ad on the Site.
                Cookies: When you visit or access the Site, you consent to our use of one or more
                cookies (small text files containing a string of characters) to your computer that
                uniquely identifies your browser. We use cookies to improve the quality of the Site
                by storing user preferences, tracking user trends, and providing personalized
                content and ads. Most web browsers accept cookies automatically, but can be
                configured not to do so or to notify the user when a cookie is being sent. If you
                wish to disable cookies, refer to your browser help menu to learn how to disable
                cookies. Please note that if you disable cookies, you may not be able to use some
                customized features available through the Site. Web Beacons: Our Site may contain
                electronic images known as web beacons (also called single-pixel gifs and
                transparent graphic images) that we use to help deliver cookies on our sites, count
                users who have visited those sites, deliver services, and analyze the effectiveness
                of our promotional campaigns, for example. We may also include web beacons in our
                marketing email messages or newsletters to determine whether an email is opened or
                if links are clicked. You consent to our use of web beacons to facilitate Site
                administration and navigation, to track the actions of users of the Site, to compile
                aggregate statistics about Site usage and response rates, and to provide an enhanced
                online experience for visitors to the Site. Aggregate Information: We may compile
                certain personal information and other information collected through the Site on an
                aggregate basis. This information may include, without limitation, the number of
                people who have visited the Site and other user demographics. Such aggregate
                information does not identify you individually. III. How We Use Personal Information
                TCBK complies with its obligations under applicable privacy laws by: keeping
                personal data up to date where needed based on the purposes for which the personal
                data is being processed; by not collecting or retaining excessive amounts of data;
                by ensuring that appropriate technical measures are in place that are designed to
                protect personal data from loss, alteration, misuse, unauthorized access and
                disclosure as it is transmitted, stored, or otherwise processed, and by using
                appropriate measures to securely destroy personal data when it is no longer needed
                by TCBK. Personal information collected through the Site may be used by us and our
                affiliates for purposes of: Responding to your questions and feedback; Providing the
                services you select through this Site; Tailoring advertisements to you; Contacting
                you, whether by email, postal mail, or telephone with information about this Site,
                our products, or our services; For such purposes as you may authorize at the time
                you submit the information; Auditing, research, and analysis to maintain, protect,
                and improve this Site and our services; Ensuring the technical functions of our
                network; Improving and customizing the content and layout of the Site; Developing
                new products and services; or Compiling personal information and other information
                collected through the Site on an aggregate basis. IV. Personal Information We Share
                We do not sell, rent, trade, or otherwise share personal information collected
                through the Site, except as described below: In Connection with our Offerings. The
                Site involves the sharing of certain personal information collected through the Site
                with (i) other users of the Site, and (ii) as you otherwise provide your consent.
                Information which you upload, post, e-mail, submit or otherwise transmit in
                connection with the Site to a public message board, chat area or other public area
                of the Site will be made public to users of the Site, including certain metadata
                related to such activities (such as timestamps). You are solely responsible for any
                such information you choose to post on or through the Site. All information that is
                posted to a message board, chat area, or other public area of the Site may be shared
                by us with (i) other users of the Site, and (ii) as you otherwise provide your
                consent. Please be aware that anything you share publically may be further shared by
                other users of the Site (for example, by emailing a screenshot of your post to
                non-users). We are not responsible for any such sharing of information you have
                shared publically on the Site. Subsidiaries and Affiliates. We may share personal
                information with our subsidiaries and affiliates for the purposes for which you
                provided the information or as reasonably necessary for our internal administrative
                and business purposes. Service Providers. We work with third parties that provide
                services on our behalf. Such services may include website hosting, marketing, and
                website usage analytics. We may share personal information and non-personal
                information with these third parties for the purpose of enabling them to provide
                these services. Consent. We may share personal information in accordance with any
                consent you provide. Required by Law. We may disclose personal information or any
                information collected through this Site if we are required to do so by law or
                pursuant to legal process, in response to a request from government officials or law
                enforcement authorities, or as necessary or appropriate in connection with an
                investigation of illegal activity. Certain Transactions. We may disclose or transfer
                personal information or any information collected through this Site to third parties
                who acquire all or a portion of our business, whether such acquisition is by way of
                merger, consolidation, or purchase of all or a portion of our assets, or in
                connection with any bankruptcy or reorganization proceeding brought by or against
                us. Interest-Based Advertising. We may participate in Interest-based advertising.
                This means that you may see advertising on the Site tailored to how you engage or
                browse, or you may see advertising for us on other websites, applications and social
                media based on your behavior across websites, applications and social media. We may
                target ads based on data we have collected, or data provided by third parties alone
                or in combination with the data we collect ourselves. If you choose to interact with
                specific third parties who advertise through the Site, the information you provide
                to them is subject to the conditions of their specific privacy policies. In
                connection with the foregoing activities, third parties, often called “ad servers”
                or “ad networks,” may place and access cookies, web beacons, or other tracking
                technology on your device to collect information about your use of the Site and your
                use of third-party sites. The information about your use of the Site may be combined
                with information about your use of third-party websites to provide targeted
                advertisements and content that may be of interest to you (this is known as
                “interest-based advertising”). The information they collect from the Site may
                identify you personally, or they may associate it with personal information
                collected in other ways or received from other third parties. We do not control
                these third parties or their use of cookies, web beacons, or other tracking
                technology. By using the Site you agree to usage tracking and targeted
                interest-based advertising. Some advertisers may provide you with the choice to
                opt-out of having your information used for interest-based advertising. If you would
                like more information about interest-based advertising, or for information about how
                to opt-out of interest-based advertising, please visit the Network Advertising
                Initiative's (“NAI”) consumer website at
                http://www.networkadvertising.org/understanding-online-advertising, and in
                particular, NAI’s Ad Network “Opt-Out” page at
                http://www.networkadvertising.org/choices/. Even if you opt-out of interest-based
                advertising, we may still collect and use information about your use of the Site to
                the extent otherwise permitted by this Privacy Policy (such as to analyze Site
                traffic and usage, conduct website analytics, administer the Site, etc.). In
                addition, if you opt-out of receiving interest-based advertising from a particular
                advertiser, the advertiser may still provide advertisements to you, but the ad will
                not be targeted to you based on your online activities. V. Aggregate Information We
                may compile de-identified personal information and other information collected
                through the Site on an aggregate basis. This information may include, without
                limitation, the number of users who have registered for the Site and demographic
                information about users and usage of the Site. Such aggregate information does not
                identify you individually. We may use aggregate information and share aggregate
                information with third parties for any of the purposes specified in this Privacy
                Policy, and for any other lawful purpose. VI. Your Choices A. Information You
                Provide You can always choose whether or not to provide information on the Site.
                However, if you choose not to disclose certain information, you may not be able to
                register as a user of the Site, which may limit your access to certain portions of
                the Site. B. Privacy Settings By default, certain types of information you choose to
                submit will be made public to users of the Site. This includes your account
                username, profile picture, and any comments or posts you make to public posts or
                discussion boards. C. Communications From Us If at any time you decide that you no
                longer wish to receive notices from us regarding the Site, you may indicate this
                preference by contacting us at: info@thecraftybarkeep.com. D. Do Not Track You can
                configure your browser not to accept cookies or to notify you when a cookie is being
                sent. E. Your Rights and Your Personal Data Unless subject to an exemption under the
                GDPR, if your personal data is subject to the GDPR, you have the following rights
                with respect to your personal data: The right to request a copy of your personal
                data which TCBK holds about you; The right to request that TCBK correct any personal
                data if it is found to be inaccurate or out of date; The right to request your
                personal data be erased where it is no longer necessary for TCBK to retain such
                data; The right to withdraw your consent at any time to the processing of personal
                data to which you provided consent for processing; The right to request that TCBK
                provide you with a copy of your personal data and where possible, to transmit that
                data directly to another data controller (known as the right to data portability);
                The right, where there is a dispute in relation to the accuracy or processing of
                your personal data, to request a restriction be placed on further processing; The
                right to object to the processing of personal data (where applicable); and The right
                to lodge a complaint with a data supervisory authority. F. Transfer of Data Abroad
                If your personal data is subject to the GDPR, TCBK will transfer personal data from
                the European Economic Area (EEA) to a location outside the EEA only when there has
                been a documented adequacy determination, or where TCBK has confirmed adequate
                privacy protections. If TCBK transfers personal data to a third party acting as an
                agent of TCBK, we will also obligate the third party to have adequate privacy
                protections in place. TCBK may transfer personal data to and on behalf of clients
                and third parties with whom TCBK has an existing service agreement or as part of our
                legal obligations, each of which shall be subject to TCBK policies, and only to the
                extent necessary for purposes of legitimate interests pursued by the data controller
                (or by a third party). G. Automated Decision Making Under the GDPR, data subjects
                have the right not to be subject to a decision based solely on automated processing,
                including profiling, which produces legal effects concerning him or her, or
                similarly significantly affects him or her, as long as the decision (1) is not is
                necessary for entering into, or the performance of, a contract between the data
                subject and a data controller, or (2) is not authorized by Union or Member State law
                to which the controller is subject and which also lays down suitable measures to
                safeguard the data subject’s rights and freedoms and legitimate interests, or (3) is
                not based on the data subject’s explicit consent. We do not engage in automated
                decision making. H. Further processing If we wish to use your personal data for a
                new purpose, not covered by this Privacy Policy, then we will provide you with a new
                notice explaining this new use prior to commencing the processing and setting out
                the relevant purposes and processing conditions. Where and whenever necessary, we
                will seek your prior consent to the new processing. VII. Information Storage and
                Security We employ reasonable security precautions to help protect against the loss,
                misuse, and alteration of personal information provided on or through the Site.
                These security measures include: storing passwords in hashed form, anti
                cross-site-request forgery measures, SSL encryption of CMS communications, and a
                monitoring system to actively screen for unwanted behaviors. However, no method of
                transmitting or storing data is completely secure. As a result, although we strive
                to protect personal information about you, we cannot guarantee the security of any
                information you transmit to us through or in connection with the Site. If you have
                reason to believe that personal information is no longer secure, please notify us
                immediately by contacting us in accordance with the last section below. VIII.
                Special Notes about Minors Minors are not eligible to use the Site, and we ask that
                minors (anyone under the age of 18) not submit any personal information to us. IX.
                External Links The Site may contain links to various websites that we do not
                control. When you click on one of these links, you will no longer be transacting
                business through the Site. Third party websites maintain their own privacy policies,
                and we do not exercise any control over any of the third party websites that may be
                linked to the Site. If you visit a website that is linked to the Site, you should
                consult that website’s privacy policy before providing any personal information.
                Please be aware that we are not responsible for the privacy practices of such other
                websites, and we are not liable for their misuse of personal information about you.
                X. Special Admonitions for International Use The Site is hosted in the United
                States. All matters relating to the Site are governed exclusively by the laws of the
                State of North Carolina in the United States of America and not the jurisdiction in
                which you are located. If you are located outside of the United States of America
                and you contact us, please be advised that any information you provide to us will be
                transferred to the United States of America and that by submitting information, you
                explicitly authorize such transfer. XI. Updates to this Privacy Policy We may change
                or update the Site or any of our policies and procedures without prior notice,
                except that if any changes are likely to have an adverse impact on your rights under
                data protection law, we will use reasonable efforts to notify you of the changes in
                advance in writing or by post mail, and, where required, obtain your consent to our
                activities. We will post a notice on this Site to advise you of any significant
                changes to this Privacy Policy and indicate via the “Last Updated” legend in this
                Privacy Policy when it was most recently updated. Except to the extent that your
                express consent to any change or update is required under data protection law, your
                continued use of the Site signifies your continued assent to the terms of this
                Privacy Policy, as updated or amended at that time. XII. Questions Regarding this
                Privacy Policy If you have any questions or comments regarding this Privacy Policy,
                please send us an email at info@thecraftybarkeep.com. Any data subject may, at any
                time, contact us directly with any questions and suggestions concerning data
                protection. We encourage interested persons to raise any concerns about the
                collection, use, or processing of personal data using the contact information
                provided above. In the event of a privacy related issue or complaint, we will
                investigate and attempt to promptly resolve any complaints and disputes regarding
                use and disclosure of personal data.
              </Text>
            </View>
          )}
        </Content>
        <ScreenFooter navigation={navigation} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  privacyPolicy: state.user.privacyPolicy,
});

const mapDispatchToProps = dispatch => ({
  getPrivacyPolicyRequest: bindActionCreators(getPrivacyPolicyReq, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacyPolicyScreen);
