/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const SettingsLazyImport = createFileRoute('/settings')()
const NotificationsLazyImport = createFileRoute('/notifications')()
const LoginLazyImport = createFileRoute('/login')()
const IndexLazyImport = createFileRoute('/')()
const MessagesIndexLazyImport = createFileRoute('/messages/')()
const TagTagLazyImport = createFileRoute('/tag/$tag')()
const MessagesConvoIdLazyImport = createFileRoute('/messages/$convoId')()
const ProfileHandleIndexLazyImport = createFileRoute('/profile/$handle/')()
const ProfileHandlePostPostIdLazyImport = createFileRoute(
  '/profile/$handle/post/$postId',
)()

// Create/Update Routes

const SettingsLazyRoute = SettingsLazyImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/settings.lazy').then((d) => d.Route))

const NotificationsLazyRoute = NotificationsLazyImport.update({
  id: '/notifications',
  path: '/notifications',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/notifications.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const MessagesIndexLazyRoute = MessagesIndexLazyImport.update({
  id: '/messages/',
  path: '/messages/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/messages/index.lazy').then((d) => d.Route),
)

const TagTagLazyRoute = TagTagLazyImport.update({
  id: '/tag/$tag',
  path: '/tag/$tag',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tag.$tag.lazy').then((d) => d.Route))

const MessagesConvoIdLazyRoute = MessagesConvoIdLazyImport.update({
  id: '/messages/$convoId',
  path: '/messages/$convoId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/messages/$convoId.lazy').then((d) => d.Route),
)

const ProfileHandleIndexLazyRoute = ProfileHandleIndexLazyImport.update({
  id: '/profile/$handle/',
  path: '/profile/$handle/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/profile/$handle/index.lazy').then((d) => d.Route),
)

const ProfileHandlePostPostIdLazyRoute =
  ProfileHandlePostPostIdLazyImport.update({
    id: '/profile/$handle/post/$postId',
    path: '/profile/$handle/post/$postId',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/profile/$handle/post.$postId.lazy').then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/notifications': {
      id: '/notifications'
      path: '/notifications'
      fullPath: '/notifications'
      preLoaderRoute: typeof NotificationsLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsLazyImport
      parentRoute: typeof rootRoute
    }
    '/messages/$convoId': {
      id: '/messages/$convoId'
      path: '/messages/$convoId'
      fullPath: '/messages/$convoId'
      preLoaderRoute: typeof MessagesConvoIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/tag/$tag': {
      id: '/tag/$tag'
      path: '/tag/$tag'
      fullPath: '/tag/$tag'
      preLoaderRoute: typeof TagTagLazyImport
      parentRoute: typeof rootRoute
    }
    '/messages/': {
      id: '/messages/'
      path: '/messages'
      fullPath: '/messages'
      preLoaderRoute: typeof MessagesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/$handle/': {
      id: '/profile/$handle/'
      path: '/profile/$handle'
      fullPath: '/profile/$handle'
      preLoaderRoute: typeof ProfileHandleIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/$handle/post/$postId': {
      id: '/profile/$handle/post/$postId'
      path: '/profile/$handle/post/$postId'
      fullPath: '/profile/$handle/post/$postId'
      preLoaderRoute: typeof ProfileHandlePostPostIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/notifications': typeof NotificationsLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/messages/$convoId': typeof MessagesConvoIdLazyRoute
  '/tag/$tag': typeof TagTagLazyRoute
  '/messages': typeof MessagesIndexLazyRoute
  '/profile/$handle': typeof ProfileHandleIndexLazyRoute
  '/profile/$handle/post/$postId': typeof ProfileHandlePostPostIdLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/notifications': typeof NotificationsLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/messages/$convoId': typeof MessagesConvoIdLazyRoute
  '/tag/$tag': typeof TagTagLazyRoute
  '/messages': typeof MessagesIndexLazyRoute
  '/profile/$handle': typeof ProfileHandleIndexLazyRoute
  '/profile/$handle/post/$postId': typeof ProfileHandlePostPostIdLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/notifications': typeof NotificationsLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/messages/$convoId': typeof MessagesConvoIdLazyRoute
  '/tag/$tag': typeof TagTagLazyRoute
  '/messages/': typeof MessagesIndexLazyRoute
  '/profile/$handle/': typeof ProfileHandleIndexLazyRoute
  '/profile/$handle/post/$postId': typeof ProfileHandlePostPostIdLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/notifications'
    | '/settings'
    | '/messages/$convoId'
    | '/tag/$tag'
    | '/messages'
    | '/profile/$handle'
    | '/profile/$handle/post/$postId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/notifications'
    | '/settings'
    | '/messages/$convoId'
    | '/tag/$tag'
    | '/messages'
    | '/profile/$handle'
    | '/profile/$handle/post/$postId'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/notifications'
    | '/settings'
    | '/messages/$convoId'
    | '/tag/$tag'
    | '/messages/'
    | '/profile/$handle/'
    | '/profile/$handle/post/$postId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  NotificationsLazyRoute: typeof NotificationsLazyRoute
  SettingsLazyRoute: typeof SettingsLazyRoute
  MessagesConvoIdLazyRoute: typeof MessagesConvoIdLazyRoute
  TagTagLazyRoute: typeof TagTagLazyRoute
  MessagesIndexLazyRoute: typeof MessagesIndexLazyRoute
  ProfileHandleIndexLazyRoute: typeof ProfileHandleIndexLazyRoute
  ProfileHandlePostPostIdLazyRoute: typeof ProfileHandlePostPostIdLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  NotificationsLazyRoute: NotificationsLazyRoute,
  SettingsLazyRoute: SettingsLazyRoute,
  MessagesConvoIdLazyRoute: MessagesConvoIdLazyRoute,
  TagTagLazyRoute: TagTagLazyRoute,
  MessagesIndexLazyRoute: MessagesIndexLazyRoute,
  ProfileHandleIndexLazyRoute: ProfileHandleIndexLazyRoute,
  ProfileHandlePostPostIdLazyRoute: ProfileHandlePostPostIdLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/notifications",
        "/settings",
        "/messages/$convoId",
        "/tag/$tag",
        "/messages/",
        "/profile/$handle/",
        "/profile/$handle/post/$postId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/notifications": {
      "filePath": "notifications.lazy.tsx"
    },
    "/settings": {
      "filePath": "settings.lazy.tsx"
    },
    "/messages/$convoId": {
      "filePath": "messages/$convoId.lazy.tsx"
    },
    "/tag/$tag": {
      "filePath": "tag.$tag.lazy.tsx"
    },
    "/messages/": {
      "filePath": "messages/index.lazy.tsx"
    },
    "/profile/$handle/": {
      "filePath": "profile/$handle/index.lazy.tsx"
    },
    "/profile/$handle/post/$postId": {
      "filePath": "profile/$handle/post.$postId.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
