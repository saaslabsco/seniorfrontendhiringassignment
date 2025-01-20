//libs
import React from 'react';

//constants
import { TEST_IDS, PLACEHOLDER } from '../DataTable/Constants';

export default function Placeholder(){
    return (
        <div data-testid={TEST_IDS.PLACEHOLER}>{PLACEHOLDER}</div>
    )
}