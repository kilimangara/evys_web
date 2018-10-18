import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LandingHeader from '../components/LandingHeader'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import FlatButton from 'material-ui/FlatButton'
import scrollToComponent from 'react-scroll-to-component'
import { Parallax, Background } from 'react-parallax'
import FirstBlock from '../components/landing/FirstBlock'
import AboutCourse from '../components/landing/AboutCourse'
import EvysQBlock from '../components/landing/EvysQBlock'
import LandingFooter from '../components/landing/LangingFooter'

export default class LandingPage extends Component {
    scrollTo = name => {
        scrollToComponent(this[name])
    }

    goToApp = () => {
        this.props.history.push('/app/login')
    }

    render() {
        return (
            <div>
                <div style={styles.wrapper}>
                    <div style={{ background: 'rgba(0,0,48,.4)' }}>
                        <LandingHeader
                            history={this.props.history}
                            evysQClicked={this.scrollTo.bind(this, 'evysq')}
                            aboutCourseClicked={this.scrollTo.bind(this, 'about')}
                            feedbackClicked={this.scrollTo.bind(this, 'footer')}
                        />
                        <FirstBlock goToApp={this.goToApp} />
                    </div>
                </div>
                <AboutCourse ref={c => (this.about = c)} goToApp={this.goToApp} />
                <EvysQBlock ref={c => (this.evysq = c)} goToApp={this.goToApp} />
                <div>
                    <Parallax blur={1} bgImage={'/static/images/back_parallax.jpg'} bgImageAlt="the cat" strength={200}>
                        <Grid>
                            <Row>
                                <Col md={12}>
                                    <h2
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'code',
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}
                                    >
                                        Более 98% репетиторов успешно окончили курс
                                    </h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div style={{ height: 300 }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <FlatButton
                                            backgroundColor={'#03A9F4'}
                                            hoverColor={'#0197db'}
                                            style={styles.loginButton}
                                            href={'app/login'}
                                        >
                                            <span style={styles.mainText}>Попробовать</span>
                                        </FlatButton>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </Parallax>
                </div>
                <LandingFooter ref={c => (this.footer = c)} />
            </div>
        )
    }
}

const styles = {
    loginButton: {
        marginBottom: '20px',
        borderRadius: '25px',
        height: 40,
        width: 200
    },
    wrapper: {
        background: 'url("static/images/backs.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    backWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'rgba(0,0,48,.3)',
        padding: '0 20px',
        height: 450
    },
    mainTextWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '20px 0',
        width: 400
    },
    secTextWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100 %',
        marginTop: 40,
        padding: '0 40px'
    },
    mainText: {
        color: 'white',
        fontSize: '24px',
        fontFamily: 'MuseoSans, sans-serif'
    },
    secText: {
        color: 'white',
        fontSize: '14px',
        fontFamily: 'MuseoSans, sans-serif'
    },
    mediumText: {
        color: 'white',
        fontSize: '18px',
        padding: '8px',
        fontFamily: 'MuseoSans, sans-serif'
    },
    tgImage: {
        background: 'url("static/images/IPHONE_TG.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
}
