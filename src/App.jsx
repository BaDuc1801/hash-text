import { Button, Col, Form, Input, message, Row } from "antd";
import CryptoJS from "crypto-js";
import { useState } from "react";

function App() {
  const [formEncrypt] = Form.useForm();
  const [formDecrypt] = Form.useForm();
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const onEncrypt = (values) => {
    if (!values.secretKey) {
      return messageApi.error("Vui lòng nhập khóa bí mật trước khi mã hóa!");
    }
    const encrypted = CryptoJS.AES.encrypt(values.text, values.secretKey).toString();
    setEncryptedText(encrypted);
    return messageApi.success("Mã hóa thành công! Sao chép chuỗi để giải mã.");
  };

  const onDecrypt = (values) => {
    if (!values.secretKey) {
      return messageApi.error("Vui lòng nhập khóa bí mật trước khi giải mã!");
    }
    try {
      const bytes = CryptoJS.AES.decrypt(values.encryptedText, values.secretKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        setDecryptedText("");
        return messageApi.error("Giải mã thất bại! Sai khóa hoặc chuỗi mã hóa.");
      }

      setDecryptedText(decryptedText);
      messageApi.success(`Giải mã thành công! Kết quả: "${decryptedText}"`);
    } catch (error) {
      setDecryptedText("");
      messageApi.error("Giải mã thất bại! Sai khóa hoặc chuỗi mã hóa.");
    }
  };

  return (
    <div className="bg-blue-100 h-screen py-2">
      {contextHolder}
      <h3 className="text-center font-semibold text-xl">Mã hóa AES</h3>
      <div className="mt-2">
        <Row>
          <Col span={12} className="flex justify-center">
            {/* Form mã hóa */}
            <Form form={formEncrypt} onFinish={onEncrypt} layout="vertical" className="bg-white w-[500px] p-5 rounded-lg">
              <p className="text-center font-semibold text-xl">Mã hóa</p>
              <Form.Item name="secretKey" label="Khóa bí mật">
                <Input.Password placeholder="Nhập khóa bí mật" />
              </Form.Item>
              <Form.Item name="text" label="Nhập text">
                <Input.TextArea rows={4} placeholder="Nhập nội dung cần mã hóa" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Mã hóa
                </Button>
              </Form.Item>
              {encryptedText && (
                <Form.Item label="Đã mã hóa">
                  <Input.TextArea rows={4} value={encryptedText} readOnly />
                </Form.Item>
              )}
            </Form>
          </Col>
          <Col span={12} className="flex justify-center">
            {/* Form giải mã */}
            <Form form={formDecrypt} onFinish={onDecrypt} layout="vertical" className="bg-white w-[500px] p-5 rounded-lg">
              <p className="text-center font-semibold text-xl">Giải mã</p>
              <Form.Item name="secretKey" label="Khóa bí mật">
                <Input.Password placeholder="Nhập khóa bí mật" />
              </Form.Item>
              <Form.Item name="encryptedText" label="Nhập text đã mã hóa">
                <Input.TextArea rows={4} placeholder="Nhập chuỗi đã mã hóa" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Giải mã
                </Button>
              </Form.Item>
              {decryptedText && (
                <Form.Item label="Đã giải mã">
                  <Input.TextArea rows={4} value={decryptedText} readOnly />
                </Form.Item>
              )}
            </Form>
          </Col>
        </Row>
      </div>

    </div>
  );
}

export default App;
