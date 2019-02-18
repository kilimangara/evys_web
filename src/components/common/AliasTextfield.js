import React, { Component } from 'react'
import {AliasTextfieldContainer, FieldAlias, InputField} from "../styled/AliasTextField";

export const AliasTextField = ({alias, aliasProps, fieldProps, onChange}) => (
    <AliasTextfieldContainer>
        <FieldAlias {...aliasProps}>
            {alias}
        </FieldAlias>
        <InputField {...fieldProps} onChange={onChange} />
    </AliasTextfieldContainer>
)