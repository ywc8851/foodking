import {
  BestRestaurantItem,
  MoreButton,
  LinkCopyButton,
  MatjibListTags,
} from '@/components';
import {
  Title,
  GrayContainer,
  ContainerTitle,
  ContainerText,
  SortMiddel70,
} from '@/components/style';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { categoryDataType } from '@/components/Carousel';
import {
  getBestPostListDocs,
  getBestRestaurantsIdDocs,
} from '@/firebase/request';

export interface BestRestaurantType {
  id: string;
  address: { city: string; district: string; detail: string };
  name: string;
  phone: string;
  category: string;
  time: string[];
  breakTime: string;
  menu: string[];
  score: number;
  description: string;
  images: string[];
}

const BestRestaurants = () => {
  const location = useLocation();
  const category = location.pathname.replace('/bestRestaurants/', '');

  const [postList, setPostList] = useState<BestRestaurantType[]>([]);
  const [categoryData, setCategoryData] = useState<categoryDataType>();

  useEffect(() => {
    getBestRestaurantsIdDocs(category).then((res: any) => {
      setCategoryData(res[0]);
      getBestPostListDocs(res[0].list).then((res: any) => {
        setPostList(res);
      });
    });
  }, []);

  return (
    <>
      <GrayContainer>
        <ContainerTitle>
          {categoryData ? categoryData.title : '맛집 베스트'}
        </ContainerTitle>
        <ContainerText>
          {categoryData ? categoryData.description : '맛집 베스트'}
        </ContainerText>
      </GrayContainer>
      <SortMiddel70>
        <ul>
          {postList.map((restaurant: BestRestaurantType) => (
            <BestRestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </ul>
        <MoreButton />
        <LinkCopyButton />
      </SortMiddel70>
      <GrayContainer>
        <SortMiddel70>
          <Title>실시간 인기 키워드</Title>
          <MatjibListTags />
        </SortMiddel70>
      </GrayContainer>
    </>
  );
};

export default BestRestaurants;
