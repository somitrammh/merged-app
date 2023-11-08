import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
const StepThree = ({ isd,mobile,slug }) => {
    const formattedIsd = isd.replace('+', '');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTwo, setShowTwo] = useState(false);
  const handleCloseTwo = () => setShowTwo(false);
  const handleShowTwo = () => setShowTwo(true);

  const [data, setData] = useState(null);
  const [payURL, setPayURL] = useState(null);

  const getCheckOutDetails = (currency) => {
    // Make the API call for CheckOut Details
    fetch(`https://forms-api.makemyhouse.com/checkout-details?&currency=${currency}&slug=${slug}`)
    // fetch(`http://localhost:4000/checkout-details?&currency=${currency}&slug=${slug}`)
      .then((response) => response.json())
      .then((resultData) => {
        console.log("data from api call", resultData);
        const url = `https://www.makemyhouse.com/payment?currency=${resultData.currency}&amount=${resultData.after_offer_amount}&mobile=${formattedIsd}${mobile}`
        setPayURL(url)
        setData(resultData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    var currency;
    if (isd === "+91") {
      currency = "INR";
    } else {
      currency = "USD";
    }
    console.log("currency",currency)
    if (currency) {
      getCheckOutDetails(currency);
    }
  }, []);

  return (
    <>
      {data !== null && (
        <section className="w-100 main-section">
          <div className="col-sm-3 main-page-con m-auto">
            <div className="row">
              <div className="col-sm-12 mb-3 main-slider">
                <Carousel data-bs-theme="dark">
                  <Carousel.Item>
                    <img loading="lazy"
                      className="d-block w-100"
                      src="https://mailer-assets.makemyhouse.com/checkout-page-images/b-1.png"
                      alt="First slide"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img loading="lazy"
                      className="d-block w-100"
                      src="https://mailer-assets.makemyhouse.com/checkout-page-images/b-2.png"
                      alt="Second slide"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img loading="lazy"
                      className="d-block w-100"
                      src="https://mailer-assets.makemyhouse.com/checkout-page-images/b-3.png"
                      alt="Third slide"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>

              <section className="price-main mt-2">
                <div className="row" style={{ padding: "0px 20px 20px 20px" }}>
                  <div className="col-12">
                    <div className="heading mt-0">
                      <h3>
                        <b>Your 2D Floor Plan is ready !</b>
                      </h3>
                    </div>
                    <p className="mb-3">
                      Experience a Conceptualized 2D floor Plan Satisfying 95%
                      of Your Given Requirement.
                    </p>
                    <p className="mb-1">
                      <strong>Delivery Time :</strong> Within 4 working hours
                    </p>
                    <p className="mb-1">
                      <strong>Delivery Via :</strong> Softcopy (Email ,
                      Whatsapp)
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <strong>Price: </strong>
                    </p>
                  </div>
                  <div className="col-9">
                    <div className="price showprice d-flex">
                      <div>{data.symbol}{data.after_offer_amount}/-</div> &nbsp; <s style={{color:'#fff'}} >{data.symbol}{data.original_amount}</s>
                      <div className="prsnt" > {data.discount}%</div> <font>OFF</font>
                    </div>
                    <div className="price expire">
                      <div>{data.symbol}{data.original_amount}/-</div><div>{data.symbol}{data.original_amount}</div>
                      <sup> &nbsp; {data.discount}%</sup>&nbsp; <font>OFF</font>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="price w-100">
                      <a
                        className="showprice w-100"
                        href={payURL}
                      >
                        <button className="btn btn-sm btn_pay w-100">
                          Pay Now
                        </button>
                      </a>
                      <a
                        className="expire w-100"
                        href="https://www.makemyhouse.com/payment?currency=INR&amount=1499&user_id=550007&mobile=919584200894"
                      >
                        <button className="btn btn-sm btn_pay w-100">
                          Pay Now
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="w-100 mt-3 mb-3">
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className="heading">
                        <h2 className="text-center">
                          <b>Sample Delivery Plans</b>
                        </h2>
                      </div>
                    </div>
                    <div className="col-6 glry-img">
                      <img loading="lazy"
                        className="d-block w-100"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/s-1.jpg"
                        alt="Third slide"
                        onClick={handleShow}
                      />
                      {/* For Image One  */}
                      <Modal show={show}>
                        <h2 className="close-mdl" onClick={handleClose}>
                          ╳
                        </h2>
                        <img loading="lazy"
                          className="d-block w-100"
                          src="https://mailer-assets.makemyhouse.com/checkout-page-images/s-1.jpg"
                          alt="Third slide"
                        />
                      </Modal>
                    </div>
                    <div className="col-6 glry-img">
                      <img loading="lazy"
                        className="d-block w-100"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/s-2.jpg"
                        alt="Third slide"
                        onClick={handleShowTwo}
                      />

                      {/* For Image Two  */}
                      <Modal show={showTwo}>
                        <h2 className="close-mdl" onClick={handleCloseTwo}>
                          ╳
                        </h2>
                        <img loading="lazy"
                          className="d-block w-100"
                          src="https://mailer-assets.makemyhouse.com/checkout-page-images/s-2.jpg"
                          alt="Third slide"
                        />
                      </Modal>
                    </div>
                  </div>
                </div>
              </section>

              <div className="advantages p-3 pt-0 pb-0">
                <div className="heading">
                  <h2 className="text-center">
                    <b>Advantages</b>
                  </h2>
                </div>
                <div className="row mt-4">
                  <div className="col-6 text-center">
                    <div className="advantages-bx">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/compass.png"
                        className="img-fluid" alt=""
                      ></img>
                      <h6>
                        Vastu compliant <br></br> plans
                      </h6>
                    </div>
                  </div>
                  <div className="col-6 text-center">
                    <div className="advantages-bx">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/architect.png"
                        className="img-fluid" alt=""
                      ></img>
                      <h6>Experienced design professionals</h6>
                    </div>
                  </div>
                  <div className="col-6 text-center">
                    <div className="advantages-bx">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/design.png"
                        className="img-fluid" alt=""
                      ></img>
                      <h6>
                        100% Quality <br></br> Assurance
                      </h6>
                    </div>
                  </div>
                  <div className="col-6 text-center">
                    <div className="advantages-bx">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/structure.png"
                        className="img-fluid" alt=""
                      ></img>
                      <h6>
                        Project <br></br> Trackability
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="faq p-3 pt-0 row">
                <div className="heading px-0">
                  <h2 className="text-center">
                    <b>Frequently Asked Questions</b>
                  </h2>
                </div>
                <div className="col-sm-12">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        What is a 2D floor plan service?
                      </Accordion.Header>
                      <Accordion.Body>
                        A conceptualised 2D floor plan is a 2-dimensional floor
                        plan or a technical drawing which is Vastu compliant,
                        created as per the house building requirements by our
                        professional designers.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        What is the process after raising a request for 2D Floor
                        Plan?
                      </Accordion.Header>
                      <Accordion.Body>
                        After the request is raised with us and payment is done
                        successfully, you will receive a conceptual 2D floor
                        plan according to the details provided by you within 4-5
                        working hours on your email. You can thereafter contact
                        us for further consultation and customization.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        What will be delivered as part of 2D floor plan service?
                      </Accordion.Header>
                      <Accordion.Body>
                        You will be getting 1 design with furniture layout of
                        all the floors.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        Will it be possible to make changes in the 2D Floor
                        Plan?
                      </Accordion.Header>
                      <Accordion.Body>
                        Yes, it will be possible to make changes to the 2D Floor
                        Plan provided with some additional charges. You can also
                        avail our detailed floor plan service with unlimited
                        changes, feel free to mail us at{" "}
                        <a href="mailto:contact@makemyhouse.com">
                          contact@makemyhouse.com
                        </a>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>
                        What is the cost of availing a 2D Floor plan service
                      </Accordion.Header>
                      <Accordion.Body>
                        The cost of a sample 2D floor plan is{" "}
                        <strong>Rs. 299/- (80% OFF on Rs.1499/-).</strong>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                      <Accordion.Header>
                        Do you provide other Architectural services?
                      </Accordion.Header>
                      <Accordion.Body>
                        Yes, we provide all other architectural services related
                        to house designing like Exterior Design, Interior
                        Design, 3D Elevation, engineering drawings, floor plans,
                        etc.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
              <section className="price-main price-main-g mt-3 mb-5">
                <div className="row p-4 pt-2">
                  <div className="col-3">
                    <img loading="lazy"
                      src="https://mailer-assets.makemyhouse.com/checkout-page-images/money.png"
                      width="100%"
                      alt="currency"
                    ></img>
                  </div>
                  <div className="col-9">
                    <div className="heading mt-0 mb-0">
                      <h3>
                        <b>100% Money Back Guarantee</b>
                      </h3>
                    </div>
                    <p className="mb-1">
                      We Provide 100% Written Money Back Guarantee on Designs if
                      not Satisfied.
                    </p>
                  </div>
                </div>
              </section>

              <div className="col-sm-12 mb-3 main-slider p-0">
                <Carousel data-bs-theme="dark">
                  <Carousel.Item>
                    <div className="carousel-item active">
                      <div className="testimonial-main text-center">
                        <img loading="lazy"
                          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          width="40px"
                          className="mb-1"
                          alt=""
                        ></img>
                        <p className="mb-0">
                          <b>Sulabh Bhargava, Indore </b>
                        </p>
                        <img loading="lazy"
                          src="https://mailer-assets.makemyhouse.com/checkout-page-images/5-star.png"
                          width="100px"
                          alt=""
                        ></img>
                        <p>
                          Ar. Rakshendra Solanki Er. Ajay Dangar Ar. Rakhi Gour
                          are one of the best architects in makemyhouse. I am
                          refering to take services from the make my house
                          company to get proper design concept and timely
                          completion of the project
                        </p>
                      </div>
                    </div>
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="carousel-item active">
                      <div className="testimonial-main text-center">
                        <img loading="lazy"
                          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          width="40px"
                          className="mb-1"
                          alt=""
                        ></img>
                        <p className="mb-0">
                          <b>Gaurav Kapahi, Chandigarh</b>
                        </p>
                        <img loading="lazy"
                          src="https://mailer-assets.makemyhouse.com/checkout-page-images/5-star.png"
                          width="100px"
                          alt=""
                        ></img>
                        <p>
                          Got best support from the elevation team. I have asked
                          for changes for more than 7-8 times. Every time they
                          responded very well. want to mention specially Mr
                          Sandeep, Mr Rishab, Mr Jackee, Mr Aditya Ms Fhreen for
                          their support.
                        </p>
                      </div>
                    </div>
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="carousel-item active">
                      <div className="testimonial-main text-center">
                        <img loading="lazy"
                          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          width="40px"
                          className="mb-1"
                        alt="" ></img>
                        <p className="mb-0">
                          <b>Gurnaam Choudhary, Panchkula, Haryana </b>
                        </p>
                        <img loading="lazy"
                          src="https://mailer-assets.makemyhouse.com/checkout-page-images/5-star.png"
                          width="100px"
                        alt="" ></img>
                        <p>
                          Exterior Front and side Elevation . Fabulous service
                          provided by team . Supportive Team member . I
                          recommend MMH team for any kind of construction
                          related work . Thanks to all team member specially
                          Nidhi Yadav, Sadhna , and Sandeep Maurya .
                        </p>
                      </div>
                    </div>
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>

              <section className="mt-4 w-100">
                <div className="row p-3 pb-4 bg-secondary m-4">
                  <div className="col-12">
                    <div className="heading px-0">
                      <h3 className="text-center">
                        Guaranteed <b>Safe</b> Checkout
                      </h3>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <a href="">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/pay-card.png"
                        width="100%;"
                        className="mt-3"
                      alt="" ></img>
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-4 w-100">
                <div className="row pt-2">
                  <div className="col-12">
                    <div className="heading px-0">
                      <h3 className="text-center">
                        <b>As Featured in</b>
                      </h3>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <a href="">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/db-logo.png"
                        width="30%;"
                      alt="" ></img>
                    </a>
                    <a href="">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/zeenews.png"
                        width="30%;"
                      alt="" ></img>
                    </a>
                    <a href="">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/The_Pioneer-logo.png"
                        width="30%;"
                      alt="" ></img>
                    </a>
                    <br></br>
                    <a href="">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/dna-logo.png"
                        width="30%;"
                      alt="" ></img>
                    </a>
                    <a href="">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/outlookmagzine.png"
                        width="30%;"
                      alt="" ></img>
                    </a>
                  </div>
                </div>
              </section>

              <section className="mt-3">
                <div className="row">
                  <div className="col-12">
                    <div className="accolades bg-light p-3 m-2 w-75 m-auto text-center">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/google-r.png"
                        width="70%"
                      alt="" ></img>
                    </div>
                    <br></br>
                    <div className="accolades bg-light p-3 m-2 w-75 m-auto mt-2">
                      <div className="row">
                        <div className="col-4 text-center">
                          <img loading="lazy"
                            src="https://mailer-assets.makemyhouse.com/checkout-page-images/award_realestate.webp"
                            width="65%"
                          alt="" ></img>
                        </div>
                        <div className="col-8">
                          <h6 className="text-dark">
                            <b>
                              The Economic Times Real Estate Conclave & Awards
                              2022
                            </b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="accolades bg-light p-3 m-2 w-75 m-auto mt-2">
                      <div className="row p-2">
                        <div className="col-4">
                          <img loading="lazy"
                            src="https://mailer-assets.makemyhouse.com/checkout-page-images/award_red.webp"
                            width="100%"
                          alt="" ></img>
                        </div>
                        <div className="col-8">
                          <h6 className="text-dark">
                            <b>Red Achievers Awards 2021</b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="accolades bg-light p-3 m-2 w-75 m-auto mt-2 mb-2">
                      <div className="row p-2">
                        <div className="col-4">
                          <img loading="lazy"
                            src="https://mailer-assets.makemyhouse.com/checkout-page-images/startupaward.png"
                            width="100%"
                          alt="" ></img>
                        </div>
                        <div className="col-8">
                          <h6 className="text-dark mb-0">
                            <b>Startup Awards 2022</b>
                          </h6>
                          <p className="mb-0 text-dark">
                            Awarded As Top 25 Startups in Indore by *Government
                            of India*
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="my-3 px-2 mt-4">
                <div className="heading">
                  <h3 className="text-sm text-center">
                    {" "}
                    <b>*Disclaimer</b>{" "}
                  </h3>
                </div>
                <p className="text-sm text-center">
                  <i>
                    These conceptual 2D Floor Plans are not “Good for
                    Construction”. To get “Good for Construction” designs,
                    please get in touch with our expert Architect and Engineer.
                    To avail detail plans and packages, Feel Free to contact us
                    at{" "}
                    <a href="mailto:contact@makemyhouse.com">
                      contact@makemyhouse.com
                    </a>{" "}
                  </i>
                </p>
              </div>

              <section className="w-100">
                <div className="">
                  <div className="col-12 text-center mb-1">
                    <a href="https://www.facebook.com/MakeMyHousePlans/">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/fb.png"
                        width="30px;" alt=""
                      ></img>
                    </a>
                    &nbsp;
                    <a href="https://www.instagram.com/makemyhouseindore/?hl=en">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/insta.png"
                        width="30px;" alt=""
                      ></img>
                    </a>
                    &nbsp;
                    <a href="https://www.youtube.com/c/Makemyhouse/videos">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/youtube.png"
                        width="30px;" alt=""
                      ></img>
                    </a>
                    &nbsp;
                    <a href="https://www.linkedin.com/company/make-my-house/?viewAsMember=true">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/linkdin.png"
                        width="30px;" alt=""
                      ></img>
                    </a>
                    &nbsp;
                    <a href="https://twitter.com/makemyhouse?s=09">
                      <img loading="lazy"
                        src="https://mailer-assets.makemyhouse.com/checkout-page-images/tw.png"
                        width="30px;" alt=""
                      ></img>
                    </a>
                  </div>
                </div>
              </section>
              <section className="w-100 mt-3">
                <div className="text-center">
                  <div className="col-12 text-center mb-1">
                    <a href="https://www.makemyhouse.com/page/t&c">
                      T&C &nbsp; |
                    </a>

                    <a href="https://www.makemyhouse.com/page/privacy-policy">
                      &nbsp; Privacy Policy &nbsp; |
                    </a>

                    <a href="https://www.makemyhouse.com/page/disclaimer">
                      &nbsp; Disclaimer
                    </a>
                  </div>
                </div>
              </section>
              <section className="w-100">
                <div className="row">
                  <div className="col-12 text-center mb-2 text-white">
                    <font>
                      An initiative by{" "}
                      <a href="https://www.makemyhouse.com/">Makemyhouse.com</a>
                    </font>
                  </div>
                </div>
              </section>
              <section className="w-100 mb-5">
                <div className="row">
                  <div className="col-12 text-center text-white">
                    <font>
                      © Copyright 2023{" "}
                      <a href="https://www.makemyhouse.com/">Make my house</a>{" "}
                      All Rights Reserved.
                    </font>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <a href={payURL}><div className="pay-button">Pay {data.symbol}{data.after_offer_amount} To Unlock Now</div></a>
        </section>
      )}
    </>
  );
};

export default StepThree;
