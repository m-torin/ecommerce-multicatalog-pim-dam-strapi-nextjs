import type {PropsWithChildren} from 'react';

import type {Post, Site} from '@prisma/client';

export type WithChildren<T = {}> = T & PropsWithChildren<{}>;

export type WithClassName<T = {}> = T & {
  className?: string;
};

export interface WithSitePost extends Post {
  site: Site | null;
}
