import React from 'react';
//import { action } from '@storybook/addon-actions';
import Scheduler from '../components/Scheduler';

export default {
  title: 'Scheduler',
  component: Scheduler,
};

const params = {
  coords: {
    latitude: 19.023840,
    longitude: -98.243571
  }
}

export const Default = () => <Scheduler {...params}/>