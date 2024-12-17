export type ProjectProps = {
  's.no': number;
  'percentage.funded': number;
  'amt.pledged': number;
};

export type TableProps = {
  data: ProjectProps[];
  loading: boolean;
  error: string | null;
};
