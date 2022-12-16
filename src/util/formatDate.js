import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

export const formatDate = {
  value: (date) => {
    return format(date, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR
    });
  },

  distance: (date) => {
    return formatDistanceToNow(date, {
      locale: ptBR,
      addSuffix: true
    });
  }
}
