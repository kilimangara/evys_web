import React, { Component } from 'react'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { chooseCompany } from '../../actions/admin/AccountActions'
import { logoutAction } from '../../actions/admin/AccountActions'

const HeaderPopover = ({
    open,
    classes,
    accountId,
    userAccounts,
    anchorEl,
    onClose,
    chooseCompany,
    currentCompany,
    currentAccount,
    logoutAction
}) => (
    <Popover open={open} anchorEl={anchorEl} onClose={onClose}>
        <div className={classes.contentContainer}>
            <div className={`${classes.content} ${classes.isBold} ${classes.largeFontSize}`}>{currentAccount}</div>
            <span className={classes.title}>Номер аккаунта: </span>
            <span>{accountId}</span>
            <div className={classes.separator} />
            <div className={classes.clickableContent}>Управление аккаунтами</div>
            <div className={classes.clickableContent}>Профиль</div>
            <div
                className={classes.clickableContent}
                onClick={() => {
                    onClose()
                    logoutAction()
                }}
            >
                Выход
            </div>
            <div className={classes.separator} />
            <div className={classes.title}>Аккаунты</div>
            {userAccounts &&
                userAccounts.map(account => (
                    <div
                        className={`${classes.clickableContent} ${
                            account.permalink === currentCompany ? `${classes.isBold} ${classes.isSelected}` : ''
                        }`}
                        onClick={() => chooseCompany(account.permalink)}
                    >
                        {account.name}
                    </div>
                ))}
        </div>
    </Popover>
)

const styles = theme => ({
    contentContainer: {
        marginLeft: '10px',
        width: '300px'
    },
    content: {
        margin: '10px 0'
    },
    largeFontSize: {
        fontSize: '20px'
    },
    clickableContent: {
        margin: '10px 0',
        color: '#98D9F8',
        cursor: 'pointer'
    },
    isBold: {
        fontWeight: 'bold'
    },
    isSelected: {
        color: '#60C7F8'
    },
    title: {
        color: 'gray'
    },
    separator: {
        display: 'block',
        height: '1px',
        border: '0',
        borderTop: '1px solid rgba(128,128,128, .5)',
        margin: '1em 24px 1em 14px',
        padding: '0'
    }
})

const mapStateToProps = ({ company_admin, account_admin: { profileData } }) => ({
    accountId: profileData && profileData.id,
    userAccounts: company_admin && company_admin.companyList,
    currentCompany: company_admin && company_admin.currentCompany,
    currentAccount: profileData && profileData.username
})

const mapActionsToProps = {
    chooseCompany,
    logoutAction
}

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(HeaderPopover)
)
