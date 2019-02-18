import React, { Component } from 'react'
import {connect} from "react-redux";
import {exitProfile, getCodeByPhoneNumber, validateCode} from "../reducers/student/auth";

export const withAuthMethods = () => (MyComponent) => {

    const mapStateToProps = ({auth: {fetching, userId, isNew, token}}) => ({
        fetching,
        userId,
        isNew,
        token
    })
    const mapDispatchToProps = {
        getCodeByPhoneNumber,
        validateCode,
        exitProfile
    }

    return connect(mapStateToProps, mapDispatchToProps)(MyComponent)
}