import React, { useState, useEffect } from 'react';
import axios from 'axios';


function PostList(props) {
    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        let body = {
            type: props.Type,
            sortPost: props.Sort,
            skip: props.Skip,
            limit: 6,
        }
        if(props.Gender) {
            body.gender = props.Gender;
        }
        if(props.FilmType) {
            body.filmType = props.FilmType;
        }
        if(props.Classification) {
            body.classification = props.Classification;
        }

        axios.post("/api/participate", body).then((response) => {
            if(response.data.success) {
                let temp = response.data.post;
                setPosts(temp);
            }
        })
    }, [props.Sort, props.Skip, props.Gender, props.FilmType, props.Classification]);

    useEffect(() => {
        console.log(Posts);
    }, [Posts]);

    return (
        <div>
            
        </div>
    )
}

export default PostList