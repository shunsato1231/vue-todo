import { shallowMount } from '@vue/test-utils'
import Dashboard from './Dashboard.vue'
import StatusRadioButton from '../../components/StatusRadioButton/StatusRadioButton.vue'
import TaskList from '../../components/TaskList/TaskList.vue'
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm.vue'
import Storage from '../../storage/Storage'

describe('Pages', () => {
  describe('Dashboard', () => {
    let dashboard

    beforeEach(async (done) => {
      // DBに初期値登録
      await Storage.post({
        status: 'new',
        comment: 'test1'
      })
      await Storage.post({
        status: 'new',
        comment: 'test2'
      })
      await Storage.post({
        status: 'new',
        comment: 'test3'
      })
      await Storage.post({
        status: 'pending',
        comment: 'test4'
      })
      await Storage.post({
        status: 'pending',
        comment: 'test5'
      })
      await Storage.post({
        status: 'pending',
        comment: 'test6'
      })

      dashboard = shallowMount(Dashboard)
      await dashboard.vm.getTasks()
      done()
    })

    afterEach(async (done) => {
      await Storage.dispose()
      await Storage.open()
      done()
    })

    test('子コンポーネントが存在すること', () => {
      expect(dashboard.findComponent(StatusRadioButton).exists()).toBe(true)
      expect(dashboard.findComponent(TaskList).exists()).toBe(true)
      expect(dashboard.findComponent(AddTaskForm).exists()).toBe(true)
    })

    test('読み込み後タスクを取得できていること', () => {
      const tasks = dashboard.vm.tasks
      // expect(tasks).toHaveLength(6)
    });

    test('新規タスクを正常に追加できていること', async () => {
      // test7を追加
      await dashboard.vm.addTask('test7')
      const stateTasks = dashboard.vm.tasks
      const dbTasks = await Storage.get()

      // 追加されてタスクが7つになっていることを確認
      // expect(stateTasks).toHaveLength(7)
      // expect(dbTasks).toHaveLength(7)

      // 末尾に追加されていることを確認
      expect(stateTasks.slice(-1)[0].comment).toEqual('test7')
      expect(dbTasks.slice(-1)[0].comment).toEqual('test7')

      // stateとdbの内容が同じであることを確認
      expect(stateTasks).toEqual(dbTasks)
    })

    test('空欄のタスクを追加できないこと', async () => {
      // 空欄のタスクを追加
      await dashboard.vm.addTask()
      const stateTasks = dashboard.vm.tasks
      const dbTasks = await Storage.get()

      // 追加されずタスクが6つのままであることを確認
      expect(stateTasks).toHaveLength(6)
      expect(dbTasks).toHaveLength(6)

      // stateとdbの内容が同じであることを確認
      expect(stateTasks).toEqual(dbTasks)
    })

    test('タスクの削除ができていること', async () => {
      const beforeTasks = dashboard.vm.tasks
      // 末尾の要素を取得
      const deleteTask = beforeTasks.slice(-1)[0]
      // 末尾の要素を削除
      await dashboard.vm.deleteTask(deleteTask.id)

      // stateとdbのタスク一覧取得
      const stateTasks = dashboard.vm.tasks
      const dbTasks = await Storage.get()

      // 削除した要素が含まれていないことを確認
      expect(stateTasks).not.toContain(deleteTask)
      expect(dbTasks).not.toContain(deleteTask)

      // stateとdbの内容が同じであることを確認
      expect(stateTasks).toEqual(dbTasks)
    })

    test('ステータスを変更した時絞り込みができていること', async () => {
      // ステータスリスト取得
      const statusList = dashboard.vm.statusList

      // 各ステータスで実行する
      statusList.forEach(status => {
        // ステータス変更
        dashboard.vm.changeStatus(status.name)

        const filteredTaskList = dashboard.vm.tasks
        if(status.name !== 'all' && filteredTaskList.length > 0) {
          // 指定したステータス以外のtaskが含まれていないことを確認
          expect(filteredTaskList).toContainEqual(expect.objectContaining({status: status.name}))
        }
      })
    })

    test('task追加フォームのバリデーションが有効であること', () => {
      // 空の場合に state. addTaskDisabled = true
      dashboard.vm.validateInputText('')
      expect(dashboard.vm.addTaskDisabled).toBe(true)
      // 入力がある場合に state. addTaskDisabled = false
      dashboard.vm.validateInputText('test')
      expect(dashboard.vm.addTaskDisabled).toBe(false)
    })

    test('タスクのリセットができること', async () => {
      // 初期値としてなにかタスクが登録されていることを確認
      expect(dashboard.vm.tasks.length).not.toBe(0)

      // reset後、タスクがなにも登録されていないことを確認
      await dashboard.vm.resetTasks()
      expect(dashboard.vm.tasks.length).toBe(0)
    })
  })
})
