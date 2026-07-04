# Decisions

## Redux Toolkit

Used Redux Toolkit with Entity Adapter for normalized task storage and efficient updates.

## Entity Adapter

Provides O(1) entity lookup and simplified reducers.

## IndexedDB

Caches task data for faster startup and limited offline support.

## WebSocket

Updates tasks without polling.

## Server Sent Events

Streams markdown summaries progressively for better UX.

## React Markdown

Used with rehype-sanitize to prevent XSS from untrusted server content.

## Trade-offs

- Client-side filtering for the currently loaded page.
- Server-side pagination handled by the mock API.
- WebSocket updates are applied only to tasks present in the local store.