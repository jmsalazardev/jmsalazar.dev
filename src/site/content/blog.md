---
layout: posts
section: blog
title: Blog
permalink: /{{ section }}/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}
override:tags: []
excerpt: Últimas noticias, actualizaciones e historias
date: 2023-01-10
pagination:
  data: collections.posts
  size: 24
  alias: posts

eleventyNavigation:
  parent: es
  key: es-posts
  title: Blog
  order: 1
  icon: blog
---
