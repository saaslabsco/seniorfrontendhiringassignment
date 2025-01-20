import React from 'react';

//constants
import { TEST_IDS, NO_RESULT_FOUND } from '../DataTable/Constants';

const ResultNotFound = () => {
    return (
        <div data-testid={TEST_IDS.NO_RESULT}> {NO_RESULT_FOUND} </div>
    )
}

export default React.memo(ResultNotFound);