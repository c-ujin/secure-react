import React from 'react'
import FullPageContent from './Shared/Wrappers/FullPageContent'

class Home extends React.Component {

    render() {
        
        return (<div>
            <div className="home-container">
                <div className="landing-left">
                    <h1 className="home-headline">Crave and Save With Cravour</h1>
                    <p>The <span>Budget</span> app to <span>Shop, Organize</span> and <span>Track</span> your Spending</p>
                    <div className="call-to-action-container">
                        <a href="/order/create"
                            className="landing-page-link call-to-action"
                        >
                            Order
                        </a>
                        <a className="landing-page-link">
                            Budget
                        </a>
                    </div>
                </div>
                <div className="landing-right">
                    <img src="https://res.cloudinary.com/ev3n72av12/image/upload/v1577290686/Cravour/Site/cravour-image-gimmick.png" />
                </div>
            </div>
            
            <div className="tagline-container">
                <h1><span>Crav</span>e It Or Dev<span>our</span> It...Your Call</h1>
                <p>Budget and Spending made easy</p>
                <br/>
            </div>
            <div className="about-container">
                <h1>Why Cravour</h1>
                <p>Shop online and never overspend again with Cravour </p>
                <div>
                    <img src="https://res.cloudinary.com/ev3n72av12/image/upload/v1585153362/Cravour/Site/thinkk.jpg" title="think-of-purchase" />
                </div>
                <div className="cravour-benefits-container">
                    <div className="list-item">
                        <p>No Cash Needed</p>
                    </div>
                    <div className="list-item">
                        <p>Shop and Sell Online</p>
                    </div>
                    <div className="list-item">
                        <p>Become a Partner</p>
                    </div>
                    <div className="list-item">
                        <p>Schedule Payment</p>
                    </div>
                    <div className="list-item">
                        <p>Instant Receipt</p>
                    </div>
                    <div className="list-item">
                        <p>Track your Expenditure</p>
                    </div>
                    <div className="list-item">
                        <p>Convenient</p>
                    </div>
                </div>
            </div>
            <div className="cravour-partner-container">
                <h1>Reach Thousands of Customers Free of Charge</h1>
                <p>Become a Cravour Partner Today</p>
                <a href="#" className="call-to-action landing-page-link" style={{ margin: "auto" }}>
                    Create a Store
                </a>
            </div>
        </div>);
    };
}

export default Home;