export const schema = {
  tables: [
    {
      name: "user_table",
      desc: "用户表",
      columns: [
        { name: "user_id", desc: "用户ID" },
        { name: "create_time", desc: "注册时间" },
        { name: "country", desc: "国家" }
      ]
    },
    {
      name: "order_table",
      desc: "订单表",
      columns: [
        { name: "order_id", desc: "订单ID" },
        { name: "user_id", desc: "用户ID" },
        { name: "pay_amount", desc: "支付金额" },
        { name: "pay_time", desc: "支付时间" }
      ]
    }
  ],

  relations: [
    {
      left: "user_table.user_id",
      right: "order_table.user_id",
      type: "1:N"
    }
  ],

  metrics: [
    {
      name: "新增用户",
      definition: "user_table.create_time 在时间范围内"
    },
    {
      name: "GMV",
      definition: "sum(order_table.pay_amount)"
    }
  ]
};