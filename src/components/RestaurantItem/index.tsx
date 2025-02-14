import food from '@/assets/food.jpeg';
import {
  RestaurantItem,
  RestaurantLink,
  RestaurantImg,
  RestaurantInfo,
  RestaurantName,
  RestaurantScore,
  RestaurantSubInfo,
  RestaurantImgBox,
  RestaurantSkeleton,
} from './restaurant.styled';
import { infoType } from '@/components/Restaurants';
import { useState, useEffect } from 'react';
import { getImageDocs } from '@/firebase/request';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface RestaurantType {
  info: infoType;
}

const Restaurant = ({ info }: RestaurantType) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [loadState, setLoadState] = useState<boolean>(false);

  useEffect(() => {
    getImageDocs(info.images[0])
      .then((res: any) => setImageSrc(res))
      .then((res) => {
        setTimeout(() => {
          setLoadState(true);
        }, 1000);
      });
  }, []);

  if (loadState) {
    return (
      <RestaurantItem>
        <RestaurantLink to="/">
          <figure>
            <RestaurantImgBox>
              <RestaurantImg src={`${imageSrc}`} alt="food" />
            </RestaurantImgBox>
            <RestaurantInfo>
              <p>
                <RestaurantName>{info.name}</RestaurantName>
                <RestaurantScore>{info.score.toFixed(1)}</RestaurantScore>
              </p>
              <RestaurantSubInfo>{`${info.address.district} - ${info.category}`}</RestaurantSubInfo>
            </RestaurantInfo>
          </figure>
        </RestaurantLink>
      </RestaurantItem>
    );
  } else {
    return (
      <RestaurantItem>
        <RestaurantLink to="/">
          <figure>
            <RestaurantImgBox>
              <RestaurantSkeleton>
                <Skeleton width={'100%'} height={'100%'} />
              </RestaurantSkeleton>
            </RestaurantImgBox>
            <RestaurantInfo>
              <p>
                <Skeleton width={'70%'} />
              </p>
              <RestaurantSubInfo>
                <Skeleton width={'40%'} />
              </RestaurantSubInfo>
            </RestaurantInfo>
          </figure>
        </RestaurantLink>
      </RestaurantItem>
    );
  }
};

Restaurant.defaultProps = {
  href: '/',
};

export default Restaurant;
