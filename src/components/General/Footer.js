import React from 'react';

export default function Footer(){
    return(
        <footer>
			<div className="main wrapper clearfix">
				<div className="foot right">
					<a href="index.html#" className="social-link"><img src="/assets/img/icon-facebook@2x.png" alt="Facebook" /></a>
					<a href="index.html#" className="social-link"><img src="/assets/img/icon-twitter@2x.png" alt="Facebook" /></a>
					<a href="index.html#" className="social-link"><img src="/assets/img/icon-linkedin@2x.png" alt="Facebook" /></a>
				</div>	
				
				<div className="foot left">
					<a href="index.html" className="logo-foot"><img src="/assets/img/logo-foot@2x.png" alt="logo" /></a>
					© Copyright Selfy 2013
				</div>	
			</div>
		</footer>
    )
}