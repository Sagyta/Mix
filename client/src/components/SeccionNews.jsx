import React, { useEffect, useState } from 'react';
import News from './News';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../redux/actions/actions';
import '../css/SeccionNews.css';
import NavBar from './NavBar';
//import { Link } from 'react-router-dom';
//import SearchBar from './SearchBar';
import Footer from './Footer';
import PuffLoader from 'react-spinners/PuffLoader';

export default function SeccionNews() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  
  const news = useSelector(state => state.news);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);
  return (
    <div className='contenidoCentral'>
      {loading ? (
        <PuffLoader
          className={'loader'}
          display={'flex'}
          justify-content={'center'}
          margin={'auto'}
          align-items={'center'}
          size={200}
          background={'transparent'}
          color={'#e78345'}
          loading={loading}
        />
      ) : (
        <div>
          <NavBar />

         {/* <SearchBar />*/}
          <div className='galeria'>
            {news.map(e => {
              return (
                <News
                  key={e.id}
                  id={e.id}
                  videoLink={e.videoLink}
                  title={e.title}
                  subtitle={e.subtitle}
                  category={e.category}
                  image={e.image}
                />
              );
            })}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}