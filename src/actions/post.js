import fetchPostSummaries from '../utilities/fetch_post_summaries.js';
import fetchSinglePost from '../utilities/fetch_single_post.js';

import {
  FETCH_POST_SUMMARIES,
  FETCH_POST
} from '../constants/actions.js';
import {
  pending,
  success,
  error,
  empty
} from '../constants/strings.js';

export function requestPost(slug) {
  return (dispatch, getState) => {
    const {posts} = getState();
    console.log('#Actions>Post');
    console.log(posts);
    console.log(slug);
    console.log('....');
    if (posts.bySlug[slug]) {
      return;
    }
    dispatch({
      type: FETCH_POST,
      status: pending,
      data: {slug}
    });
    fetchSinglePost(slug)
      .then((posts) => {
        console.log('>>>> SUCESS');
        console.log(posts[0]);
        dispatch({
          type: FETCH_POST,
          status: success,
          data: posts[0]
        });
      }).catch((err) => {
        console.log(err.stack);
        dispatch({
          type: FETCH_POST,
          status: error,
          data: {slug}
        });
      });
  };
}

export function requestPostSummaries() {
  return (dispatch, getState) => {
    const {posts} = getState();
    if (posts.summaries.status !== empty) {
      return;
    }
    dispatch({
      type: FETCH_POST_SUMMARIES,
      status: pending
    });
    fetchPostSummaries()
      .then((posts) => {
        const sortedPosts = posts.sort((post1, post2) => {
          const date1 = new Date(post1.published_at);
          const date2 = new Date(post2.published_at);
          return date2.getTime() - date1.getTime();
        });
        dispatch({
          type: FETCH_POST_SUMMARIES,
          status: success,
          data: sortedPosts
        });
      }).catch((err) => {
        dispatch({
          type: FETCH_POST_SUMMARIES,
          status: error
        });
      });
  };
}
