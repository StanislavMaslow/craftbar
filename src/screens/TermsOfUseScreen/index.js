import React from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import styles from './styles';
import ScreenHeader from '../../commons/ScreenHeader';
import ScreenFooter from '../../commons/ScreenFooter';

const TermsOfUseScreen = ({ navigation }) => (
      <Container>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor="#000" barStyle="light-content" />
        )}
        <ScreenHeader target="" title="Terms of Use" navigation={navigation} />
        <Content style={styles.content}>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}1. Acceptance of Terms{'\n'}
          </Text>
          <Text style={styles.justified}>
            Welcome to The Crafty Barkeep (“TCBK,” “Company,” “we” or “us”) and our Website Terms of
            Service (“Terms”). These Terms are important and affect your legal rights, so please
            read them carefully. Note that Section 18 of these Terms contains a mandatory
            arbitration provision that requires the use of arbitration on an individual basis and
            limits the remedies available to you in the event of certain disputes.
          </Text>
          <Text style={styles.justified}>
            By accessing or using https://www.thecraftybarkeep.com, The Crafty Barkeep mobile
            applications and various related services (collectively, the “Site”), you agree to be
            bound by these Terms and all of the terms incorporated herein by reference.
          </Text>
          <Text style={styles.justified}>
            By accepting these Terms, you represent that you are 18 years of age or older and that,
            if you have accepted these Terms on behalf of any person or entity, you represent that
            you have legal authority to do so and that such person or entity agrees to be
            responsible to us if you or such person or entity violates these Terms.
          </Text>
          <Text style={styles.justified}>
            If you do not agree to every provision of these Terms, you may not, and we do not
            authorize you to, access or use the Site or any features provided on the Site. By
            accessing or using the Site, you represent and warrant that you have not been previously
            suspended or removed from the Site, or engaged in any activity that could result in
            suspension or removal from the Site. These Terms may be revised at any time for any
            reason, and TCBK may provide you notice of these changes by any reasonable means,
            including by providing notice through the Site. You can determine when we last updated
            the Site by referring to the “Last Updated” legend at the top of these Terms. Except to
            the extent that your express consent to any revised Terms is required under data
            protection law, by continuing to access, browse or use the Site, you confirm your
            acceptance of the revised Terms and all the terms incorporated herein by reference. We
            strongly recommend that you periodically visit this page of the Site to review these
            Terms. If you do not agree to the revised Terms, you may not access or use the Site.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}2. Registration and Personal Data{'\n'}
          </Text>
          <Text style={styles.justified}>
            In order to access and use certain areas or features of the Site, you will need to
            register for an account. Each registration is for a single user only. By creating an
            account, you agree to (a) provide accurate, current and complete account information,
            (b) maintain and promptly update, as necessary, your account information, (c) maintain
            the security of your account credentials, (d) be responsible for the acts or omissions
            of any third party who has authority to access or use the Site on your behalf, and (e)
            immediately notify us if you discover or otherwise suspect any security breaches related
            to the Site or your account. If you provide information that is untrue, inaccurate, not
            current or incomplete, we may suspend or terminate your account and refuse any and all
            current or future use of the Site. By creating an account, you also consent to receive
            electronic communications from TCBK (e.g., via email or by posting notices to the Site).
            These communications may include notices about your account (e.g., payment
            authorizations, password changes and other transactional information) and are part of
            your relationship with us. You agree that any notices, agreements, disclosures or other
            communications that we send to you electronically will satisfy any legal communication
            requirements, including, but not limited to, that such communications be in writing. You
            should maintain copies of electronic communications from us by printing a paper copy or
            saving an electronic copy. We may also send you promotional communications via email,
            including, but not limited to, newsletters, special offers, surveys and other news and
            information we think will be of interest to you. You may opt out of receiving these
            promotional emails at any time by following the unsubscribe instructions provided
            therein.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}3. License to Access and use the Site and Content{'\n'}
          </Text>
          <Text style={styles.justified}>
            Unless otherwise indicated in writing by us, the Site and all content and other
            materials contained therein, including, without limitation, the TCBK logo and all
            designs, text, graphics, pictures, information, data, software, User Content (as defined
            in Section 6), other files and the selection and arrangement thereof (collectively,
            “Content”) are the property of TCBK or our licensors or users, as applicable, and are
            protected by U.S. and international copyright and other laws. Subject to these Terms,
            you are hereby granted a personal, non-exclusive, non-transferable, non-sublicensable
            license to access and make personal, non-commercial use of the Site and Content. All
            rights not expressly granted herein are reserved. You do not acquire any ownership
            interest in the Site or Content under these Terms, or any other rights thereto other
            than to use the Site in accordance with the license granted, and subject to all terms,
            conditions and restrictions of these Terms. However, such license is subject to these
            Terms and does not include any right to, and you shall not, directly or indirectly: (a)
            sell, resell or use commercially the Site or Content, (b) distribute, publicly perform
            or publicly display any Content, (c) modify or otherwise make any derivative uses of the
            Site or Content, or any portion thereof, (d) use any data mining, robots or similar data
            gathering or extraction methods, (e) download (other than page caching) any portion of
            the Site or Content, except as expressly permitted by us, (f) use the Site to stalk,
            threaten, or otherwise violate the rights of others, including without limitation
            others’ privacy rights or rights of publicity; (g) interfere with the Site or servers or
            networks used in connection with the Site; or (h) use the Site or Content other than for
            their intended purposes. Any use of the Site or Content other than as specifically
            authorized herein, without our prior written permission, is strictly prohibited and will
            terminate the license granted herein. Such unauthorized use may also violate applicable
            laws, including, without limitation, copyright and trademark laws and applicable
            communications regulations and statutes. Unless explicitly stated by us, nothing in
            these Terms shall be construed as conferring any right or license to any patent,
            trademark, copyright or other proprietary rights of TCBK or any third party. This
            license is revocable at any time. You will not remove, alter or conceal any copyright,
            trademark, service mark or other proprietary rights notices incorporated in or
            accompanying the Content and you will not reproduce, modify, adapt, prepare derivative
            works based on, perform, display, publish, distribute, transmit, broadcast, sell,
            license or otherwise exploit the Content.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}4. Trademarks{'\n'}
          </Text>
          <Text style={styles.justified}>
            The TCBK logo, and any other TCBK product or service names, trademarks, logos, or other
            indicia (“Marks”) that may appear on the Site are the property of TCBK or its
            subsidiaries, affiliates or third parties, and may not be copied, imitated or used, in
            whole or in part, without our prior written permission. Nothing contained in the Site
            shall be construed as granting, by implication or otherwise, any license or right to use
            any such Mark without the prior written permission of TCBK or such third party that may
            own such Mark. Your misuse of any such Mark, or any other Content, is strictly
            prohibited.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}5. Legal Requirements; Privacy Policy{'\n'}
          </Text>
          <Text style={styles.justified}>
            TCBK is committed to processing and protecting the personal data collected through the
            Site when you use the Site in compliance with its obligations under applicable privacy
            laws, laws governing the privacy of your personal data, including, if applicable to you,
            the European Union General Data Protection Regulation. TCBK’s policy is to retain
            personal data necessary to provide our services, except that we may retain your personal
            data for longer periods where reasonably necessary to comply with our legal obligations
            (including law enforcement requests), meet regulatory requirements, resolve disputes,
            maintain security, prevent fraud and abuse, enforce these Terms, or fulfill your request
            to “unsubscribe” from further messages from us. This policy applies to personal data
            that you or others provided to us and personal data generated or inferred from your use
            of our services. When TCBK is the data controller, we will decide how your personal data
            is processed and for what purposes. For additional information about your rights and
            your personal data, what data is collected, how it is processed, protected, shared, and
            how long it is retained, please see the TCBK’s Privacy Policy located at
            http://www.thecraftybarkeep.com/the-fine-print/. Where TCBK has a good faith belief that
            such action is necessary to comply with a judicial proceeding, court order, warrant,
            administrative order, civil investigative demand, subpoena, or other valid process, TCBK
            may disclose IP addresses, personal information, and any contents of the Site where it
            is legally compelled to do so. We implement a number of security features to help
            guarantee and ensure to the greatest extent possible that your information is safe. We
            use industry standard technologies when transferring and receiving user data exchanged
            between TCBK and third parties to ensure its security. User data may be stored on
            servers maintained by our third party partners and subject to their security safeguards
            which are periodically audited, with certifications from accreditation bodies across
            geographies and verticals. All financial transactions are made securely. Please see
            TCBK’s Privacy Policy located at http://www.thecraftybarkeep.com/the-fine-print/ for
            additional information relating to the privacy and security of information collected
            hereunder.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}6. User Content{'\n'}
          </Text>
          <Text style={styles.justified}>
            You are solely responsible and liable for all data, information and other materials
            (“User Content”) that you submit, upload, post, e-mail or otherwise transmit
            (“Transmit”) in connection with the Site. In addition, we have no control over, and
            shall have no liability for, any damages resulting from the use (including without
            limitation re-publication) or misuse by any third party of information made public
            through the Site. IF YOU CHOOSE TO SUBMIT TO US, OR OTHERWISE MAKE ANY USER CONTENT
            PUBLICLY AVAILABLE, YOU DO SO AT YOUR OWN RISK AND WE SHALL HAVE NO LIABILITY THEREFOR.
            You agree that you will not, and will not permit anyone else to, directly or indirectly:
            Transmit any User Content that is unlawful, harmful, threatening, abusive, hateful,
            obscene, harassing, tortious, defamatory, libelous, slanderous, pornographic, profane,
            vulgar, offensive, lewd, invasive of another’s privacy or racially, ethnically or
            otherwise objectionable; Transmit any User Content: (i) that you do not have the right
            to Transmit, under any law or contractual or fiduciary relationships, including, without
            limitation, any inside information or proprietary or confidential information; (ii) that
            infringes any patent, copyright, trademark or other intellectual property right or
            misappropriates any trade secret or right of privacy of any third-party; (iii) that
            constitutes unsolicited or unauthorized advertising or promotional materials, “spam,”
            “chain letters,” or pyramid schemes; or (iv) that contains any software routine, code,
            instruction or virus that is designed to disable, delete, modify, damage or erase
            software, hardware or data; Forge headers or otherwise manipulate identifiers in order
            to disguise any User Content Transmitted through the Site. Although we have no
            obligation to screen, edit or monitor User Content, we reserve the right, and have
            absolute discretion, to remove, screen or edit User Content posted or stored on the Site
            at any time and for any reason, and you are solely responsible for creating backup
            copies of and replacing any User Content you post or store on the Site at your sole cost
            and expense.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}7. Rights in User Content{'\n'}
          </Text>
          <Text style={styles.justified}>
            We do not claim any ownership interest in your User Content. However, by uploading,
            posting or submitting User Content to the Site or to our pages or feeds on third party
            social media platforms (e.g., TCBK’s Facebook page or Instagram page), you hereby grant
            TCBK a nonexclusive, royalty-free, worldwide, perpetual, irrevocable and fully
            sublicensable right and license to use, reproduce, modify, adapt, publish, translate,
            create derivative works from, distribute, perform and publicly display your User
            Content, in whole or in part, in any manner or media and for any purpose whatsoever at
            our sole discretion, including, without limitation, for publicity, promotional,
            advertising, trade, business, illustration, artistic and other commercial and
            noncommercial purposes, however, TCBK will only share personal information that you
            provide in accordance with our Privacy Policy at
            http://www.thecraftybarkeep.com/the-fine-print/. You acknowledge and agree that Company
            may disclose or use any User Content that you Transmit for purposes that include, but
            are not limited to: (a) enforcing these Terms; (b) complying with any laws, regulations
            or rules of any federal, state or local government or agency; (c) responding to claims
            that any User Content violates the rights of third parties; or (d) protecting the rights
            or property of TCBK, its customers or the public.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}8. Feedback{'\n'}
          </Text>
          <Text style={styles.justified}>
            Separate and apart from User Content, you can submit questions, comments, suggestions,
            ideas, original or creative materials or other information about TCBK, the Site or the
            services (collectively, “Feedback”). Feedback is non-confidential and shall become the
            sole property of TCBK. TCBK shall own exclusive rights, including, without limitation,
            all intellectual property rights, in and to such Feedback and shall be entitled to the
            unrestricted use and dissemination of this Feedback for any purpose, commercial or
            otherwise, without acknowledgment or compensation to you.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}9. Linked Sites{'\n'}
          </Text>
          <Text style={styles.justified}>
            We have not reviewed all of the websites linked to the Site and are not responsible for
            the content of any third-party pages, any other websites linked to the Site, or any
            products or services offered by third parties linked to the Site. Nothing in the Site,
            including, without limitation, any links to other websites, should be construed as an
            endorsement of any products, services or information of any other persons or companies
            by TCBK. Your choice to access a link to any other website is at your own risk, and you
            agree to comply with all terms and conditions relating to such websites. TCBK reserves
            the right not to link, or to remove the link, to a particular website at any time. Any
            links to third party websites are provided as a convenience to you and are neither owned
            nor operated by TCBK. We have no control over these linked websites and make no
            representations or warranties with respect to these linked websites or third party
            products or services. Your viewing and use of any third-party website is at your sole
            discretion and risk.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}10. Indemnification{'\n'}
          </Text>
          <Text style={styles.justified}>
            You shall indemnify, hold harmless, and, at TCBK’s option, defend TCBK from and against
            any and all losses, damages, liabilities, costs (including reasonable attorneys’ fees)
            (“Losses”) incurred by TCBK resulting from any third-party claim, suit, action or
            proceeding relating to or arising from your use of the Site, any User Content that you
            Transmit to or through the Site, any Feedback you provide, any violation of these Terms
            by you, or any other act or omission by you, including your violation of any rights of
            another, arising from your use of the Site or any of its features. You further agree
            that TCBK shall have control of the defense or settlement of any third party claims,
            unless TCBK exercises its option to require you to defend TCBK. This indemnity is in
            addition to, and not in lieu of, any other indemnities set forth in a written agreement
            between you and TCBK.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}11. Disclaimers{'\n'}
          </Text>
          <Text style={styles.justified}>
            THE SITE AND THE CONTENT ARE PROVIDED ON AN “AS IS”, “AS AVAILABLE” AND “WITH ALL
            FAULTS” BASIS. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, TCBK DOES NOT MAKE ANY
            REPRESENTATIONS OR WARRANTIES OR ENDORSEMENTS OF ANY KIND WHATSOEVER, EXPRESS OR
            IMPLIED, AS TO: (A) THE SITE; (B) THE CONTENT; (C) USER CONTENT; OR (D) SECURITY
            ASSOCIATED WITH THE TRANSMISSION OF INFORMATION TO THE SITE. IN ADDITION, TCBK HEREBY
            DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, THAT ANY RESULTS WILL
            BE ACHIEVED, NON-INFRINGEMENT, TITLE, CUSTOM, TRADE, QUIET ENJOYMENT, SYSTEM INTEGRATION
            AND FREEDOM FROM COMPUTER VIRUS. TCBK DOES NOT REPRESENT OR WARRANT THAT THE SITE WILL
            BE ERROR-FREE OR UNINTERRUPTED; THAT DEFECTS WILL BE CORRECTED; OR THAT THE SITE OR THE
            SERVER THAT MAKES THE SITE AVAILABLE IS FREE FROM ANY HARMFUL COMPONENTS, INCLUDING,
            WITHOUT LIMITATION, VIRUSES. TCBK DOES NOT MAKE ANY REPRESENTATIONS OR WARRANTIES THAT
            THE INFORMATION (INCLUDING ANY INSTRUCTIONS) ON THE SITE IS ACCURATE, COMPLETE, OR
            USEFUL. YOU ACKNOWLEDGE THAT YOUR USE OF THE SITE IS AT YOUR SOLE RISK. TCBK DOES NOT
            WARRANT THAT YOUR USE OF THE SITE IS LAWFUL IN ANY PARTICULAR JURISDICTION, AND TCBK
            SPECIFICALLY DISCLAIMS SUCH WARRANTIES. SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE
            DISCLAIMER OF IMPLIED OR OTHER WARRANTIES SO THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU
            TO THE EXTENT SUCH JURISDICTION'S LAW IS APPLICABLE TO YOU AND THESE TERMS. BY ACCESSING
            OR USING THE SITE YOU REPRESENT AND WARRANT THAT YOUR ACTIVITIES ARE LAWFUL IN EVERY
            JURISDICTION WHERE YOU ACCESS OR USE THE SITE.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}12. Limitation of Liability; Waiver{'\n'}
          </Text>
          <Text style={styles.justified}>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL TCBK BE LIABLE FOR
            ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND (INCLUDING, BUT
            NOT LIMITED TO, LOSS OF REVENUE, INCOME OR PROFITS, LOSS OF USE OR DATA, LOSS OR
            DIMINUTION IN VALUE OF ASSETS OR SECURITIES, OR DAMAGES FOR BUSINESS INTERRUPTION)
            ARISING OUT OF OR IN ANY WAY RELATED TO THE ACCESS TO OR USE OF THE SITE (INCLUDING, BUT
            NOT LIMITED TO, USER CONTENT, AND LINKS TO THIRD PARTY SITES), OR THE ORDER, RECEIPT OR
            USE OF ANY PRODUCT OR SERVICE, OR OTHERWISE RELATED TO THESE TERMS (INCLUDING, BUT NOT
            LIMITED TO, ANY DAMAGES CAUSED BY OR RESULTING FROM RELIANCE ON ANY INFORMATION OBTAINED
            FROM TCBK, OR FROM EVENTS BEYOND TCBK’S REASONABLE CONTROL, SUCH AS SITE INTERRUPTIONS,
            DELETIONS OF FILES OR EMAILS, ERRORS OR OMISSIONS, DEFECTS, BUGS, VIRUSES, TROJAN
            HORSES, DELAYS IN OPERATION OR TRANSMISSION OR ANY FAILURE OF PERFORMANCE, WHETHER OR
            NOT RESULTING FROM ACTS OF GOD, COMMUNICATIONS FAILURE, THEFT, DESTRUCTION OR
            UNAUTHORIZED ACCESS TO TCBK RECORDS, PROGRAMS OR SYSTEMS), REGARDLESS OF THE FORM OF
            ACTION, WHETHER BASED IN CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, SIMPLE
            NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED) OR ANY OTHER LEGAL OR EQUITABLE THEORY
            (EVEN IF THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF
            WHETHER SUCH DAMAGES WERE FORESEEABLE). TO THE FULLEST EXTENT PERMITTED BY APPLICABLE
            LAW, IN NO EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY OF TCBK ARISING OUT OF OR IN ANY
            WAY RELATED TO THE SITE EXCEED THE AMOUNT PAID TO TCBK FOR ANY PRODUCTS OR SERVICES IN
            THE NINETY (90) DAYS PRIOR TO THE EVENT GIVING RISE TO SUCH LIABILITY. THE FOREGOING
            LIMITATIONS SHALL APPLY EVEN IN THE EVENT YOUR REMEDIES HEREUNDER FAIL OF THEIR
            ESSENTIAL PURPOSE, AND THE FOREGOING SHALL CONSTITUTE TCBK’S SOLE LIABILITY AND
            OBLIGATION IN RESPECT HEREOF, REGARDLESS OF THE FORM OF ACTION, WHETHER BASED IN
            CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, SIMPLE NEGLIGENCE, WHETHER ACTIVE,
            PASSIVE OR IMPUTED), OR ANY OTHER LEGAL OR EQUITABLE THEORY. IF YOU ARE A CALIFORNIA
            RESIDENT, YOU HEREBY WAIVE YOUR RIGHTS UNDER CALIFORNIA CIVIL CODE 1542, WHICH STATES “A
            GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO
            EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR
            HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR.”
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}13. ARBITRATION AND CLASS ACTION WAIVER{'\n'}
          </Text>
          <Text style={styles.justified}>
            PLEASE READ THE FOLLOWING SECTION CAREFULLY BECAUSE IT REQUIRES YOU TO ARBITRATE CERTAIN
            DISPUTES AND CLAIMS WITH TCBK AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM
            US. YOU AND TCBK AGREE THAT ANY DISPUTE, CLAIM OR CONTROVERSY ARISING OUT OF OR RELATING
            IN ANY WAY TO THESE TERMS, OR THE SERVICES SHALL BE FINALLY DECIDED BY BINDING
            ARBITRATION UNDER THE RULES OF THE AMERICAN ARBITRATION ASSOCIATION GOVERNING CONSUMER
            DISPUTES. Arbitration uses a single, neutral arbitrator to decide a dispute (instead of
            a judge or jury); arbitration allows for more limited discovery than in a court case;
            and the arbitration process and result is subject to very limited review by courts. In
            an arbitration you have the right, at your expense, to be represented by an attorney of
            your choosing. Arbitrators can award the same damages and relief under these Terms that
            a court can award under these Terms. You and TCBK agree that any in-person arbitral
            hearing would occur in the United States in the same county and state as your billing
            address. TCBK further agrees that your filing fee for an arbitration will be capped at
            the amount set by the American Arbitration Association. You agree that, by agreeing to
            these Terms, the U.S. Federal Arbitration Act governs the interpretation and enforcement
            of this provision, and that you and TCBK are each waiving the right to a trial by jury
            or to participate in a class action. This arbitration provision shall survive
            termination of these Terms and the termination of your use of the services. REGARDLESS
            OF THE FORUM, YOU AND TCBK AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN
            YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED
            CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you and TCBK agree otherwise,
            the arbitrator may not join or consolidate more than one person’s claims with your
            claims, and may not otherwise preside over any form of a representative or class
            proceeding. If this specific provision is found to be unenforceable, then the entirety
            of this arbitration provision shall be null and void. The arbitrator may award
            declaratory or injunctive relief only in favor of the individual party seeking relief
            and only to the extent necessary to provide relief warranted by that party’s individual
            claim.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}14. Modifications to the Site{'\n'}
          </Text>
          <Text style={styles.justified}>
            We reserve the right in our sole discretion to modify, suspend or discontinue,
            temporarily or permanently, the Site (or any features or parts thereof) at any time.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}15. Special Admonitions for International Use{'\n'}
          </Text>
          <Text style={styles.justified}>
            This Site is hosted in the United States of America. If you are located outside of the
            United States of America and you contact us, please be advised that any information you
            provide to us will be transferred to the United States of America and that by submitting
            information, you explicitly authorize such transfer.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}16. Termination{'\n'}
          </Text>
          <Text style={styles.justified}>
            Notwithstanding anything contained in these Terms, we reserve the right, without notice
            and in our sole discretion, to terminate your right to access or use the Site at any
            time and for any or no reason, and you acknowledge and agree that we shall have no
            liability or obligation to you in such event and that you will not be entitled to a
            refund of any amounts that you have already paid to us, to the fullest extent permitted
            by applicable law.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}17. Governing Law and Jurisdiction{'\n'}
          </Text>
          <Text style={styles.justified}>
            TCBK operates the Site from North Carolina, U.S.A. These Terms and the transactions they
            contemplate, including without limitation their interpretation, construction,
            performance and enforcement shall be governed by the laws of the State of North
            Carolina, U.S.A., including its statutes of limitations, but without reference to
            conflict or choice of law provisions, as applicable to contracts made and performed
            entirely within such State. The International Convention on the Sale of Goods, and other
            international treaties that are not mandatory with respect to contracts made and
            performed entirely in North Carolina shall not apply. Except as otherwise provided in
            Section 18, the exclusive forum for the resolution of any dispute relating to these
            Terms shall be in the state courts North Carolina, U.S.A., or the United States District
            Court for the Eastern District of North Carolina, and each of the parties agrees to
            personal jurisdiction of such courts with regard to any dispute relating to these Terms,
            and you agree to service of process on you by e-mail to the address you have submitted
            on the Site, if any, and by any other means permitted by law.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}18. Notice{'\n'}
          </Text>
          <Text style={styles.justified}>
            All notices, demands, or consents given by you under these Terms will be in writing and
            will be deemed given when delivered to TCBK at the following contact:
            info@thecraftybarkeep.com. Any notices to you may be made via either e-mail or postal
            mail to the address in TCBK’s records or via posting on the Site. Please report any
            violations of these Terms to TCBK at the contact listed above.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}19. Severability{'\n'}
          </Text>
          <Text style={styles.justified}>
            If any term, clause or provision of these Terms is held invalid or unenforceable, then
            that term, clause or provision will be severable from these Terms and will not affect
            the validity or enforceability of any remaining part of that term, clause or provision,
            or any other term, clause or provision of these Terms.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}20. Procedure for Making Claims of Copyright Infringement{'\n'}
          </Text>
          <Text style={styles.justified}>
            We expect users of the Site to respect the intellectual property rights of others. If
            you believe in good faith that any of the content on the Site infringes your copyright,
            please provide our copyright agent the written information specified below. a. An
            electronic or physical signature of the person authorized to act on behalf of the owner
            of the copyright interest; b. A description of the copyrighted work that you claim has
            been infringed; c. A description of where the material that you claim is infringing is
            located on the Site; d. Your address, telephone number and email address; e. A statement
            by you that you have a good faith belief that the disputed use is not authorized by the
            copyright owner, its agent or the law; and f. A statement by you, made under penalty of
            perjury, that the information in the notice is accurate and that you are the copyright
            owner, or are authorized to act on behalf of the owner, of an exclusive right that is
            allegedly infringed. TCBK’s copyright agent for notice of claims of copyright
            infringement can be reached by obtaining contact information by request by emailing:
            info@thecraftybarkeep.com.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}21. Miscellaneous{'\n'}
          </Text>
          <Text style={styles.justified}>
            These Terms constitute the entire agreement between you and TCBK relating to your access
            to and use of the Site. These Terms, and any rights and licenses granted hereunder, may
            not be transferred or assigned by you without the prior written consent of TCBK. No
            waiver of any provision of these Terms will constitute a waiver of such provision in any
            prior, concurrent or subsequent circumstance, and TCBK’s failure to assert any right or
            provision under these Terms shall not constitute a waiver of such right or provision.
            Except as otherwise provided herein, these Terms are intended solely for the benefit of
            the parties and are not intended to confer third party beneficiary rights upon any other
            person or entity.
          </Text>
          <Text style={[styles.bold, styles.centered]}>
            {'\n'}22. Payment Processing{'\n'}
          </Text>
          <Text style={styles.justified}>
            Our service functions alongside third party payment processing provider, Stripe, the
            Stripe API, and in conjunction, your Stripe account to process credit and debit card
            transactions for your TCBK account. In order to use the TCBK service you must have an
            active Stripe account and be bound by the Stripe terms of use. Any use of that
            information is governed by your agreement with Stripe and subject to Stripe’s Privacy
            Policy. We do not see this information when it is being submitted and we do not have any
            control over the use of this information You expressly understand and agree that TCBK
            shall not be liable for any payments and monetary transactions that occur through your
            use of the Service. You expressly understand and agree that all payments and monetary
            transactions are handled by Stripe. You agree that TCBK shall not be liable for any
            issues regarding financial and monetary transactions between you and any other party,
            including Stripe. You are responsible for all transactions processed through the Service
            and/or Stripe. TCBK is not liable for loss or damage from errant or invalid transactions
            processed with Your Stripe account. This includes transactions that were not processed
            due to a network communication error, or any other reason. If you process a transaction,
            it is your responsibility to verify that the transaction was successfully processed. You
            understand that TCBK uses the Stripe API to run the Service and that the Stripe API is
            subject to change at any time and such changes may adversely affect the Service. You
            understand and agree to not hold TCBK liable for any adverse affects that actions
            (whether intentional or unintentional) on the part of Stripe may cause to your Stripe
            account or your TCBK account. You must not process stolen credit cards, or unauthorized
            credit cards through Stripe and/or your TCBK account.
          </Text>
        </Content>
        <ScreenFooter navigation={navigation} />
      </Container>
    );

TermsOfUseScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

TermsOfUseScreen.defaultProps = {
  navigation: {},
};

export default TermsOfUseScreen;
