/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const AccField = Model.define(
  'AccField',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
    },
    fieldName: {
      type: DataType.STRING(255),
    },
    fieldLabel: {
      type: DataType.STRING(255),
    } 
  }
);

export default AccField;
