## &lt;morph-tabbar&gt;

Tab bar that morphs for current mobile OS.

## Getting Started:
For the information about how to clone the desired repository, running the local server and testing, please refer to this [link].(https://github.com/moduware/polymorph-components/blob/master/INFO.md)


  ## Demo
  - Here is a quick demo of the morph-tabbar element.

  ![alt text](https://user-images.githubusercontent.com/15607784/32863524-acdd8f68-ca10-11e7-87ce-11338333fd43.png)


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





  ![alt text](https://user-images.githubusercontent.com/15607784/32863385-2bcd3946-ca10-11e7-9036-74f974328377.png)


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



### Attributes

| Custom Attribute |   Type  | Description                                                                                                                      | Default     |
|:----------------:|:-------:|----------------------------------------------------------------------------------------------------------------------------------|-------------|
|  **`selected`**  | String  | Takes the value of **`name`** attribute<br> of the selected tabbar item. In order<br>  to have default selected item,<br> assign  it's name. | **`null`**  |
|    **`label`**   | Boolean | To have a tabbar with label assign **`true`**                                                                                          | **`false`** |

### Styling

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
