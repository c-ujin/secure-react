import React from 'react';
import FullPageContent from '../Pages/Shared/Wrappers/FullPageContent';

const Faq = (props) => {

    return (
        <FullPageContent>
            <div className="padded-content">
                <h2>Frequenly Asked Questions</h2>
                <div className="faq-item">
                    <b>Why Cravour.com?</b>
                    <p>Cravour is a web app that helps you plan and organise how you spend online.</p>
                </div>
                <div className="faq-item">
                    <b>How do I Fund my cravour account?</b>
                    <p>Kindly visit cravour.com and use the highlight Manage wallet to create a cravour wallet.</p>
                </div>
                <div className="faq-item">
                    <b>How can I use Cravour.com?</b>
                    <p>Cravour.com can be used to budget, payroll, purchase products and items automatically.</p>
                </div>
                <div className="faq-item">
                    <b>Is Cravour compatible on all platforms?</b>
                    <p>We recommend you use cravour.com on google chrome, Safari or Microsoft Edge browser.</p>
                </div>
                <div className="faq-item">
                    <b>How do I contact you?</b>
                    <p>You can send us an email (info@cravour.com) or call 00123456789.</p>
                </div>
                <div className="faq-item">
                    <b>How Safe and secure is Cravour.com</b>
                    <p>Cravour.com is built using the latest web technology.</p>
                    <p>Your security is our major priority, so we work with a PCIDSS-compliant payment processor, Paystack to handle your card details.</p>
                    <p>Your card details are extremely safe and are warehoused where they can never be compromised.</p>
                </div>
                <div className="faq-item">
                    <b>When and how do I get my money back?</b>
                    <p>When you create an order to a merchant or business, your transfer is done using the command you set to the confirmed party. </p>
                    <p>Your planned purchase is completed to the account you set by default as well.</p>
                </div>
        </div>
        </FullPageContent>
    );
}

export default Faq;