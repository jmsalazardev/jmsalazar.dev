---
layout: layouts/posts
eleventyNavigation:
  parent: es-home
  key: es-blog
  title: Blog
  order: 1
title: Blog
description: Publicaciones de JMSalazarDev

pagination:
  data: collections.esPosts
  size: 2
  alias: posts
permalink: /{{ locale.lang }}/blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}

---
