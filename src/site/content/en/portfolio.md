---
layout: posts
section: portfolio
title: Portfolio
permalink: /{{ locale.lang }}/{{ section }}/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}
override:tags: []
description: My latest projects.
date: 2022-06-03
pagination:
  data: collections.projects
  size: 1
  alias: posts

eleventyNavigation:
  parent: en
  key: en-projects
  title: Projects
  order: 1
  icon: code
---