/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [postData, setPostData] = useState({});

    const updatePostData = (newData) => {
        setPostData(prev => ({ ...prev, ...newData }));
    };

    return (
        <PostContext.Provider value={{ postData, updatePostData }}>
            {children}
        </PostContext.Provider>
    );
};
