//libs
import React from 'react';

//constants
import { TEST_IDS, ERROR_TITLE } from '../DataTable/Constants';

export default function ErrorPage(){
    return (
        <div data-testid={TEST_IDS.ERROR}>{ERROR_TITLE}</div>
    )
}