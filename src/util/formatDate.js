import { format, formatDistanceToNow, parseJSON } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

export const formatDate = {
  value: (date) => {
    const dt = parseJSON(date)
    return format(dt, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR
    });
  },

  distance: (date) => {
    const dt = parseJSON(date)
    return formatDistanceToNow(dt, {
      locale: ptBR,
      addSuffix: true
    });
  }
}
