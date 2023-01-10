---
layout: posts
section: blog
title: Blog
permalink: /{{ locale.lang }}/{{ section }}/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}
override:tags: []
description: Our latest news, updates, and stories
date: 2023-01-10
pagination:
  data: collections.enposts
  size: 24
  alias: posts

eleventyNavigation:
  parent: en
  key: en-posts
  title: Blog
  order: 1
  icon: blog
---
