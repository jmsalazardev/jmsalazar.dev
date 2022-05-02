---
layout: layouts/posts
eleventyNavigation:
  parent: en-home
  key: en-posts
  title: Posts
  order: 1
  icon: /src/_includes/svg/articles.svg
title: Posts
description: Publicaciones de JMSalazarDev

pagination:
  data: collections.enPosts
  size: 24
  alias: posts
permalink: /{{ locale.lang }}/blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}

---
