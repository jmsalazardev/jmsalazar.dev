---
layout: posts
section: blog
title: Blog
permalink: /{{ locale.lang }}/{{ section }}/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}
override:tags: []
description: Nuestras ultimas noticias, actualizaciones e historias
date: 2022-05-11
pagination:
  data: collections.blogPosts
  size: 1
  alias: posts

eleventyNavigation:
  parent: es
  key: es-blog
  title: Blog
  order: 1
  icon: blog
---