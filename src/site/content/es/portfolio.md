---
layout: posts
section: portfolio
title: Portafolio
permalink: /{{ locale.lang }}/{{ section }}/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}
override:tags: []
description: Conoce mis ultimos proyectos.
date: 2022-06-03
pagination:
  data: collections.projects
  size: 1
  alias: posts

eleventyNavigation:
  parent: es
  key: es-projects
  title: Proyectos
  order: 1
  icon: code
---