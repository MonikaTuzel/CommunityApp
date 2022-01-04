import React from 'react';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const SidebarData = [
  {
    title: 'Użytkownicy',
    path: '/users',
    icon: <GroupOutlinedIcon color="secondary" />,
    text: 'Użytkownicy',
  },
 
  {
    title: 'Dokumenty',
    path: '/files',
    icon: <ArticleOutlinedIcon color="secondary"/>,
  },
 
  {
    title: 'Dostawy',
    path: '/delivery',
    icon: <LocalShippingOutlinedIcon color="secondary"/>,
  },
 
  {
    title: 'Adresy',
    path: '/adresses',
    icon: <PermContactCalendarOutlinedIcon color="secondary" />,
  },  
  
  {
    title: 'Kontakt',
    path: '/contacts',
    icon: <CommentOutlinedIcon color="secondary" />,
  },
  {
    title: 'Ustawienia',
    path: '/settings',
    icon: <SettingsOutlinedIcon color="secondary"/>,
  },
];