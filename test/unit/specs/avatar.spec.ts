import { mountWithProps, mountWithElement, wait } from '../util'
import { Avatar } from 'packages/avatar'
import { IMAGE_SUCCESS, IMAGE_FAIL } from '../mocks/uri'

describe('Avatar', () => {
  it('create', async () => {
    const wrapper = mountWithProps(Avatar, {
      icon: 'el-icon-user-solid',
    })
    expect(wrapper.vm.$el).toBeTruthy()
  })

  it('size is number', async () => {
    const wrapper = mountWithElement({
      template: `
        <el-avatar :size="50" icon="el-icon-user-solid">
        </el-avatar>
      `,
    })
    expect((wrapper.element as HTMLElement).style.height).toEqual('50px')
  })

  it('size is string', async () => {
    const wrapper = mountWithElement({
      template: `
        <el-avatar size="small">
          user
        </el-avatar>
      `,
    })
    expect(wrapper.classes('el-avatar--small')).toBeTruthy()
  })

  it('shape', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-avatar size="small" shape="square">
        user
      </el-avatar>
      `,
    })
    expect(wrapper.classes('el-avatar--square')).toBeTruthy()
  })

  it('icon avatar', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-avatar icon="el-icon-user-solid">
      </el-avatar>
      `,
    })
    expect(wrapper.classes('el-avatar--icon')).toBeTruthy()
    expect(wrapper.vm.$el.children[0])
  })

  it('image avatar', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-avatar src="${IMAGE_SUCCESS}"></el-avatar>
      `,
    })
    const imgElement = wrapper.vm.$el.children[0]
    expect(imgElement.tagName.toUpperCase()).toEqual('IMG')
    expect(imgElement.src).toEqual(IMAGE_SUCCESS)
  })

  it('image fallback', async () => {
    const wrapper = mountWithElement({
      template: `
        <el-avatar src="${IMAGE_FAIL}" :error="errorHandler">
          fallback
        </el-avatar>
        `,
      setup() {
        const errorHandler = () => {
          return true
        }
        return { errorHandler }
      },
    })
    await wait()
    expect(wrapper.text().trim()).toEqual('fallback')
  })

  it('image fit', async () => {
    const wrapper = mountWithElement({
      template: `
      <div>
        <el-avatar :src="url"></el-avatar>
        <el-avatar :src="url" v-for="fit in fits" :fit="fit" :key="fit"></el-avatar>
      </div>
      `,
      setup() {
        return {
          fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
          url: IMAGE_SUCCESS,
        }
      },
    })
    await wait()
    const containerElm = wrapper.vm.$el
    expect(containerElm.children[0].children[0].style.objectFit).toEqual(
      'cover'
    )
    expect(containerElm.children[1].children[0].style.objectFit).toEqual('fill')
    expect(containerElm.children[2].children[0].style.objectFit).toEqual(
      'contain'
    )
    expect(containerElm.children[3].children[0].style.objectFit).toEqual(
      'cover'
    )
    expect(containerElm.children[4].children[0].style.objectFit).toEqual('none')
    expect(containerElm.children[5].children[0].style.objectFit).toEqual(
      'scale-down'
    )
  })
})
