Shattered Streams was an experiment in musical ephemerality, presenting original music from 31 artists throughout May 2016. Each song was available to stream on a loop for a maximum period of 24 hours, degrading over that time until they simply disappeared.

----

Inspired equally by the fleeting ecstasy of William Basinski’s Disintegration Loops and the modern emphasis on streaming-centric platforms conforming to listener’s usage and fidelity needs, Shattered Streams presented degradation of both audio and visuals to create an immersive yet ultimately finite listening experience.

### Structure

The site consisted of three primary views:

![](frames.png)

- **Index** was the primary landing page, consisting of a brief overview of the project, information on the currently active stream, and several options to choose the duration of your session.
- **Calendar** contained the list of contributing artists and the corrosponding day their streams are active.
- **Stream** was a full-frame animation loop feeding back in on itself. Paramaters were mapped to the amplitude of frequency ranges of the audio loop, which was degrading simultaneously.

### Sound Design

Something which communicated a degredation of access. We weren’t looking to make it sound “analog” or “digital”, which meant avoiding tropes like tape hiss or bit crunching.

### Audio

Session length had a wide range of possible durations, starting with a minimum of a minute and ending with a maximum of 24 hours. This required the degredation of the audio not to be part of the track, but take place live in browser over the duration of your session.

The Web Audio API which ships natively which each browser has matured within the past few years, and now supports complex signal processing chains.

Degredation of the stream occurs by passing the audio signal through a series of convolvers with extreme impulse reaction samples. There are a few high/lowpass filters and a layer of distortion in the mix, too.

### Visual

- Something which matched the audio, and the way in which it degraded.
- Feedback loop
- Six frame animations

### Development

The site was a frameworkless static single page app. We relied on [Browserify](http://browserify.org) to bundle everything up, and [PIXI](http://www.pixijs.com) was heavily used for the stream visuals.