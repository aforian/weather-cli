import moment from 'moment';

export function convertDate(dateStr = 'today') {
  switch (dateStr) {
    case 'today': {
      return moment().format('YYYY-MM-DD');
    }
    case 'tomorrow': {
      return moment().add(1, 'day').format('YYYY-MM-DD');
    }
    default: {
      if (moment(dateStr).isValid()) {
        return moment(dateStr).format('YYYY-MM-DD');
      } else {
        return 'invalid date';
      }
    }
  }
} 
