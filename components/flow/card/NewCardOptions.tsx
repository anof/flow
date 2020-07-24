import {Button, Grid} from '@material-ui/core';
import {cardsTypes} from '../../../utils/cards/cardsTypes';
import {getBackgroundColor} from '../../../styles/cardsTypesColors';
import React, {useState} from 'react';
import _map from 'lodash/map';

export const NewCardOptions = () => {
  const [typeChosen, setTypeChosen] = useState(null as any);

  const handleSelectType = (type: string) => {
    switch (type) {
      case cardsTypes.link:
        setTypeChosen(<div>add link here</div>);
        break;
      case cardsTypes.flow:
        setTypeChosen(<div>add flow here</div>);
        break;
      case cardsTypes.image:
        setTypeChosen(<div>add image here</div>);
        break;
      case cardsTypes.text:
        setTypeChosen(<div>add text here</div>);
        break;
      default:
        setTypeChosen(<div>Something went wrong!</div>);
    }
  };
  return <Grid container spacing={2}>
    {
      typeChosen ||
      _map(cardsTypes, (value: any, key: any) => {
          if (value === cardsTypes.selectType)
            return;
          return <Grid item xs={12} sm={12} md={3}>
            <Button
              fullWidth
              variant={'contained'}
              style={{backgroundColor: getBackgroundColor(value), color: '#FFFFFF'}}
              size={'large'}
              onClick={() => handleSelectType(value)}
            >
              {value}
            </Button>
          </Grid>;
        }
      )}
  </Grid>;
};