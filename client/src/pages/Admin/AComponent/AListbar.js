import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/contansts';

const ListItems = [
  {
    title: 'Book',
    value: 'book',
    sub_title: [
      { sub_title: '책관리', value: 'book'},
    ],
  },
  {
    title: 'User',
    value: 'user',
    sub_title: [
      { sub_title: '회원관리', value: 'user' },
    ],
  },
  {
    title: 'Loans',
    value: 'loans',
    sub_title: [
      { sub_title: '대출 관리', value: 'loans' },
    ],
  },
  {
    title: 'Faq',
    value: 'faq',
    sub_title: [
      { sub_title: 'Faq', value: 'faq' },
    ],
  },
  {
    title: 'Event',
    value: 'event',
    sub_title: [
      { sub_title: '이벤트', value: 'event' },
    ],
  },
  {
    title: 'Banner',
    value: 'banner',
    sub_title: [
      { sub_title: 'Banner 관리', value: 'banner' },
    ],
  },
  {
    title: 'Review',
    value: 'review',
    sub_title: [
      { sub_title: '리뷰 관리', value: 'review' },
    ],
  },
  {
    title: 'Manual',
    value: 'manual',
    sub_title: [
      { sub_title: 'Manual', value: 'manual' },
    ],
  },
];

const AListbar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSubtitleClick = (event, index, subIndex) => {
    event.stopPropagation();
  };

  const renderListItems = (items) => {
    return items.map((item, index) => (
      <div key={index}>
        <ListItem
          button
          onClick={() => handleClick(index)}
          sx={{
            pl: item.sub_title ? 0 : 4,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#000' }}></ListItemIcon>
          <ListItemText primary={item.title} sx={{ color: '#000' }} />
          {item.sub_title && (openIndex === index ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {item.sub_title && (
          <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.sub_title.map((subItem, subIndex) => (
                <ListItem
                  button
                  key={subIndex}
                  sx={{
                    pl: 4,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={(event) => handleSubtitleClick(event, index, subIndex)}
                >
                  <ListItemIcon></ListItemIcon>
                  <NavLink to={`/admin/${item.value}/${subItem.value}`}>
                    <ListItemText primary={subItem.sub_title} sx={{ color: '#000' }} />
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <div id='AListbar-container-kjn'>
      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 220,
            boxSizing: 'border-box',
            backgroundColor: '#81c147',
            paddingTop: 1,
          },
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <NavLink to='/admin'><img src={API_URL+`/adminlogo.png`} alt='로고' style={{ width: '200px', height: '150px' }} /></NavLink>
        </div>
        <List>{renderListItems(ListItems)}</List>
      </Drawer>
    </div>
  );
};

export default AListbar;