import { Routes, Route } from 'react-router-dom';
import {
  MatjibList,
  Main,
  NotFound,
  Best5,
  ReviewWritePage,
  SearchResult,
  Restaurants,
} from '@/pages';

const Router = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="matjib_list" element={<MatjibList />} />
      <Route path="search/:endpoint" element={<SearchResult />} />
      <Route path="bestRestaurants/:category" element={<Best5 />} />
      <Route path="reviews" element={<ReviewWritePage />} />
      <Route path="/restaurants/:postId" element={<Restaurants />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
