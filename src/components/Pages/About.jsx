import React from 'react';

import FullPageContent from '../Pages/Shared/Wrappers/FullPageContent'

class About extends React.Component {

    render() {
        return (
            <FullPageContent>
                <div className="padded-content">
                    <h2>About Us</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mollis erat eu sem dignissim, eget rutrum ipsum molestie. Maecenas justo neque, pharetra id diam sed, finibus commodo massa. Donec a augue urna. Etiam euismod magna nec urna aliquam scelerisque. Vivamus dictum a arcu sit amet tincidunt. Phasellus ac turpis mattis, bibendum eros in, elementum purus. Vivamus eu ultrices nibh. Suspendisse tincidunt erat ac vestibulum eleifend. Aenean feugiat tortor non vestibulum suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sit amet lectus nec urna ullamcorper pharetra. Suspendisse potenti. Suspendisse molestie mollis justo, et finibus velit maximus id. Integer semper semper ipsum, commodo placerat erat imperdiet sed.
                    </p>
                    <br/>
                    <h5>Cravour Team</h5>
                </div>
            </FullPageContent>
        );
    }
}

export default About;