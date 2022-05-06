---
layout: layouts/posts
eleventyNavigation:
  parent: es-home
  key: es-blog
  title: Blog
  order: 1
  icon: blog
title: Blog
excerpt: Ultimas noticias, actualizaciones y comentarios de un desarrollador de software

pagination:
  data: collections.esPosts
  size: 6
  alias: posts
permalink: /{{ locale.lang }}/blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}

---
