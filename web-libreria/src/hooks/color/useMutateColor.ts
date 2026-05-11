import { postColor, putColor } from '@/src/actions/color.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateColor = () => {
  const client = useQueryClient();

  const startPutColor = useMutation({
    mutationFn: ({ id, color, codigo }: { id: number; color: string; codigo: string }) => putColor(id, color, codigo),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['colores'] });
    },
  });

  const startPostColor = useMutation({
    mutationFn: ({ color, codigo }: { color: string; codigo: string }) => postColor(color, codigo),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['colores'] });
    },
  });

  return {
    startPutColor,
    startPostColor,
  };
};
