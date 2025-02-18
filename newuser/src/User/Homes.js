import React from 'react'
import Head from './Head'
import Footer from './Footer'

function Homes() {
  return (
    <div>
      <Head />
      <div id="banner" class="banner full-screen-mode parallax">
        <div class="container pr">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="banner-static">
                    <div class="banner-text">
                        <div class="banner-cell">
                            <h1>Serve with us  <span class="typer" id="some-id" data-delay="200" data-delim=":" data-words="Friends:Family:Officemates" data-colors="red"></span><span class="cursor" data-cursorDisplay="_" data-owner="some-id"></span></h1>
                            <h2>Feed them </h2>
                            <p>Quality food at cheap rates through us will help you to serve your shelter</p>
                            <div class="book-btn">
                                <a href="#reservation" class="table-btn hvr-underline-from-center">Get some Food</a>
                            </div>
                            <a href="#about">
                                <div class="mouse"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <div id="about" class="about-main pad-top-100 pad-bottom-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                        <h2 class="block-title"> About Us </h2>
                        <h3>IT STARTED, QUITE SIMPLY, LIKE THIS...</h3>
                        <p align="justify"> Serve the Needy is a dynamic solution designed to combat food waste and address food 
                            insecurity by connecting donors, including restaurants, grocery stores, and individuals </p>

                        <p align="justify"> The Serve the Needy project aims to create a robust platform designed to mitigate food 
                            waste and combat food insecurity by directly connecting food donors with recipients in need. 
                            By facilitating seamless transactions, the project ensures that surplus food reaches those who 
                            need it most, thereby reducing waste and providing nutritious meals to underserved 
                            communities. </p>

                        <p align="justify"> It aims to revolutionize the approach to addressing 
                            food waste and food insecurity. It seeks to create a mutually beneficial environment for donors and recipients 
                            ultimately contributing to a more sustainable and equitable food system.</p>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                        <div class="about-images">
                            <img class="about-main" src="images/about-main.jpg" alt="About Main Image" />
                            <img class="about-inset" src="images/about-inset.jpg" alt="About Inset Image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer />  


    </div>
  )
}

export default Homes
