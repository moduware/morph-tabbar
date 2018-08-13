# morph-tabbar

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/PolymerElements/paper-progress)

Tab bar that morphs for current mobile OS.

`morph-tabbar` is the containing parent element for the `morph-tabbar-item`. These components changes its appearance automatically based on whether the platform or device is IOS or Android.

## Getting Started

For the information about how to clone the desired repository, running the local server and testing, please refer to Polymorph elements getting started docs at the end of this repository.

## Demo

<!---

```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../morph-tabbar-item/morph-tabbar-item.html">
    <link rel="import" href="morph-tabbar.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html

<h3>Andriod tabbar</h3>
<p>Click the items to see it in action</p>

<morph-tabbar platform="android" selected="play" label> 
  <morph-tabbar-item platform="android" name="play" not-selected-image="img/play_android.svg" selected-image="img/play_android_selected.svg" has-label>play</morph-tabbar-item>
  <morph-tabbar-item platform="android" name="favorite" not-selected-image="img/favorite_android.svg" selected-image="img/favorite_android_selected.svg" has-label>favorite</morph-tabbar-item>
  <morph-tabbar-item platform="android" name="mic" not-selected-image="img/mic_android.svg" selected-image="img/mic_android_selected.svg" has-label>mic</morph-tabbar-item>
</morph-tabbar>

<h3>IOS tabbar</h3>
<p>Click the items to see it in action</p>

<morph-tabbar platform="ios" selected="play" label>
  <morph-tabbar-item platform="ios" name="play" not-selected-image="img/play_ios.svg" selected-image="img/play_ios_selected.svg" has-label>play</morph-tabbar-item>
  <morph-tabbar-item platform="ios" name="favorite" not-selected-image="img/favorite_ios.svg" selected-image="img/favorite_ios_selected.svg" has-label>favorite</morph-tabbar-item>
  <morph-tabbar-item platform="ios" name="mic" not-selected-image="img/mic_ios.svg" selected-image="img/mic_ios_selected.svg" has-label>mic</morph-tabbar-item>
</morph-tabbar>

```

- Here is a quick demo of the morph-tabbar element.

<p align="center">
  <img src="demo-images/ios-demo.gif" alt="IOS morph-tabbar demo"/>
</p>

```html

  <template>
    <h3>IOS morph-tabbar demo</h3>
    <morph-tabbar platform="ios" selected="play">
      <morph-tabbar-item platform="ios" name="play" not-selected-image="../img/play_ios.svg" selected-image="../img/play_ios_selected.svg"></morph-tabbar-item>
      <morph-tabbar-item platform="ios" name="favorite" not-selected-image="../img/favorite_ios.svg" selected-image="../img/favorite_ios_selected.svg"></morph-tabbar-item>
      <morph-tabbar-item platform="ios" name="mic" not-selected-image="../img/mic_ios.svg" selected-image="../img/mic_ios_selected.svg"></morph-tabbar-item>
    </morph-tabbar>
  </template>

```

  <p align="center">
    <img src="demo-images/android-demo.gif" alt="IOS morph-tabbar demo"/>
  </p>

  ```html

  <template>
    <h3>Android morph-tabbar with label demo</h3>
    <morph-tabbar platform="android" selected="play" label>
      <morph-tabbar-item platform="android" name="play" not-selected-image="../img/play_android.svg" selected-image="../img/play_android_selected.svg" label></morph-tabbar-item>
      <morph-tabbar-item platform="android" name="favorite" not-selected-image="../img/favorite_android.svg" selected-image="../img/favorite_android_selected.svg" label></morph-tabbar-item>
      <morph-tabbar-item platform="android" name="mic" not-selected-image="../img/mic_android.svg" selected-image="../img/mic_android_selected.svg" label></morph-tabbar-item>
    </morph-tabbar>
  </template>

  ```

## Attributes

| Custom Attribute |   Type  | Description                                                                                                                      | Default     |
|:----------------:|:-------:|----------------------------------------------------------------------------------------------------------------------------------|-------------|
|  **`selected`**  | String  | Takes the value of **`name`** attribute<br> of the selected tabbar item. In order<br>  to have default selected item,<br> assign  it's name. | **`null`**  |
|    **`label`**   | Boolean | To have a tabbar with label assign **`true`**                                                                                          | **`false`** |

## Styling

-For Android platform;

Custom property                  | Description                            | Default
---------------------------------|----------------------------------------|--------------------
`--android-background-color`     | Background color of the tabbar         | #0076FF
`--android-height`               | Height of the tabbar                   | 48px
`--android-labeled-height`       | Height of the tabbar with label        | 72px
`--android-bar-color`            | Color of the highlight bar under tabbar| rgba(255,255,255,.7)

-For IOS platform;

Custom property                  | Description                            | Default
---------------------------------|----------------------------------------|--------------------
`--ios-background-color`         | Background color of the tabbar         | #f7f7f8
`--ios-height`                   | Height of the tabbar                   | 44px
`--ios-labeled-height`           | Height of the tabbar with label        | 50px
`--ios-bar-color`                | Color of the highlight bar above tabbar| #c4c4c4

NOTE: For tabbar to take on the parent background color, you can assign `--android-background-color: transparent` or `--ios-background-color: transparent`

## Further help

For more information on how to install and run test please go here - [Polymorph elements getting started]

[Polymorph elements getting started]: https://github.com/moduware/polymorph-components/blob/master/INFO.md
