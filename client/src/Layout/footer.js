import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

function Footer() {
    return (
        <footer>
            <MDBFooter
                className="text-center text-white"
                style={{ backgroundColor: '#f1f1f1' }}
            >
                <MDBContainer className="pt-4">
                    <section className="mb-4">
                        <MDBBtn
                            rippleColor="dark"
                            color="link"
                            floating
                            size="lg"
                            className="text-dark m-1"
                            href="https://www.facebook.com/namkha.huynh.90"
                            role="button"
                        >
                            <MDBIcon fab className="fab fa-facebook-f" />
                        </MDBBtn>

                        <MDBBtn
                            rippleColor="dark"
                            color="link"
                            floating
                            size="lg"
                            className="text-dark m-1"
                            href="https://myaccount.google.com/?utm_source=OGB&utm_medium=app"
                            role="button"
                        >
                            <MDBIcon fab className="fa-google" />
                        </MDBBtn>

                        <MDBBtn
                            rippleColor="dark"
                            color="link"
                            floating
                            size="lg"
                            className="text-dark m-1"
                            href="https://www.instagram.com/hnamkha/"
                            role="button"
                        >
                            <MDBIcon fab className="fa-instagram" />
                        </MDBBtn>

                        <MDBBtn
                            rippleColor="dark"
                            color="link"
                            floating
                            size="lg"
                            className="text-dark m-1"
                            href="https://github.com/hnkvng"
                            role="button"
                        >
                            <MDBIcon fab className="fa-github" />
                        </MDBBtn>
                    </section>
                </MDBContainer>
                <div
                    className="text-center text-dark p-3"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    © 2020 Copyright:
                    <a className="text-dark" href="https://mdbootstrap.com/">
                        MDBootstrap.com
                    </a>
                </div>
            </MDBFooter>
        </footer>
    );
}
export default Footer;
